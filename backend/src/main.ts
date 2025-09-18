import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração global de validação de dados
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: false,
    forbidNonWhitelisted: false,
  }));

  // Garantindo que o frontend possa acessar o backend via local ou docker
  app.enableCors({
    origin: [
      'http://localhost:4200',  
      'http://localhost:80',    
      'http://localhost',       
      'http://frontend:80',     
      'http://frontend',        
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(3000);
  console.log('🚀 Backend API iniciado com sucesso na porta 3000');
  console.log('📊 Endpoints disponíveis: /vehicles');
  console.log('🔗 Integração com RabbitMQ configurada');
}
bootstrap();
