import { Module } from '@nestjs/common';
import { VehicleProcessorService } from './vehicle-processor.service';

/**
 * Módulo principal do Worker Microservice
 * Configura o processador de eventos de veículos como provider e controller
 * 
 * Nota: VehicleProcessorService é registrado como controller para que
 * os decorators @EventPattern funcionem corretamente
 */
@Module({
  providers: [VehicleProcessorService],
  controllers: [VehicleProcessorService],
})
export class AppModule {}
