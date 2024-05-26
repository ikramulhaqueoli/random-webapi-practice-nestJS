import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SendMessageDto } from 'src/dto/send-message.dto';
import { ViewMessagesDto } from 'src/dto/view-messages.dto';
import { Message } from 'src/schemas/message.schema';
import { RabbitMQService } from './rabbitmq.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessageService {
  rabbitMqQueueName: "instant-message-notification-queue"

  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private userService: UsersService,
    private rabbitMqService: RabbitMQService
  ) {}

  async get(selfUsername: string, viewMessagesDto: ViewMessagesDto): Promise<any> {
    const partnerUsername = viewMessagesDto.partnerUsername
    const page = viewMessagesDto.pagination.page
    const limit = viewMessagesDto.pagination?.limit
    const skip = (page-1) * limit

    const filter = {
      $or: [
        { senderUsername: selfUsername, receiverUsername: partnerUsername },
        { senderUsername: partnerUsername, receiverUsername: selfUsername }
      ]
    }

    const totalMessages = await this.messageModel.countDocuments(filter)
    const totalPages = Math.ceil(totalMessages / limit);

    const messages = await this.messageModel.find({
      $or: [
        { senderUsername: selfUsername, receiverUsername: partnerUsername },
        { senderUsername: partnerUsername, receiverUsername: selfUsername }
      ]
    })
    .sort({ sentAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec();

    return {
      data: messages,
      totalMessages: totalMessages,
      totalPages: totalPages,
      currentPage: page
    };
  }

  async sendMessage(senderUsername: string, sendMessageDto: SendMessageDto): Promise<any> {
    const receiverExists = this.userService.existsByUsername(sendMessageDto.receiverUsername)

    if (!receiverExists) {
      throw new BadRequestException("Message reciever not found in the system.")
    }

    const createdMessage = new this.messageModel(sendMessageDto)
    createdMessage['senderUsername'] = senderUsername

    const message = await createdMessage.save()

    this.rabbitMqService.notifyMessage(this.rabbitMqQueueName, message)
    
    return {
      success: true,
      message: message
    }
  }
}
