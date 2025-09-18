import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672'],
      queue: 'vehicle_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
  console.log('Worker microservice rodando e escutando eventos do RabbitMQ');
  console.log(`Conectado ao RabbitMQ: ${process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672'}`);
  console.log('Worker pronto para receber eventos: vehicle_created, vehicle_updated, vehicle_deleted');
}
bootstrap();
