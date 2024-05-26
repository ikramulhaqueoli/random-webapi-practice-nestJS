import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ViewMessagesDto } from 'src/dto/view-messages.dto';
import { Message } from 'src/schemas/message.schema';

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

    async get(viewMessagesDto: ViewMessagesDto): Promise<any> {
      const selfUsername = viewMessagesDto.selfUsername
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
}
