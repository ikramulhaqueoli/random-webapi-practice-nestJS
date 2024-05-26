import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private readonly connection: Promise<amqp.Connection>;

  constructor() {
    this.connection = amqp.connect('amqp://guest:guest@localhost:5672/');
  }

  async notifyMessage(queue: string, message: any): Promise<void> {
    try {
      const connection = await this.connection;
      const channel = await connection.createChannel();
  
      await channel.assertQueue(queue);
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  
      setTimeout(() => {
        channel.close();
        connection.close();
      }, 500);
    }
    catch (error) {
      console.error(`Error sending message to rabbitMQ: ${error.message}`);
    }
  }
}
