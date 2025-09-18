import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: false,
    forbidNonWhitelisted: false,
  }));

  // Garantindo que o frontend possa acessar o backend via local ou docker
  app.enableCors({
    origin: [
      'http://localhost:4200',  // Angular dev server
      'http://localhost:80',    // Frontend dockerizado
      'http://localhost',       // Frontend dockerizado (porta padrão)
      'http://frontend:80',     // Comunicação entre containers
      'http://frontend',        // Comunicação entre containers
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(3000);
  console.log('Backend rodando na porta 3000');
}
bootstrap();
