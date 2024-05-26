import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQService } from './rabbitmq.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule, 
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])
  ],
  providers: [MessageService, RabbitMQService],
  exports: [MessageService]
})
export class MessageModule {}
