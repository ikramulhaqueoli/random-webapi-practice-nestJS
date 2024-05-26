import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('YouApp Coding Challange')
    .setDescription(`
    # Endpoints description:
    Register:
    - Registers new user to the system with username, email, password.
    - Password is hashed while storing in database.

    Create Profile:
    - Create Profile for the logged-in user to the system.

    Get Profile:
    - Gets the profile information of the logged-in user.

    Update Profile:
    - Updates profile.
    - All the fields are optional.
    - Only updates the properties that are given.

    View Messages:
    - Get paginated messages with partnerUsername of logged-in user.

     Send Message:
    - Saves message to the database.
    - Send notification through the RabbitMQ queue.
      `)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}
