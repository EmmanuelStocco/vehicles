import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

/**
 * Serviço responsável por publicar eventos no RabbitMQ
 * Utiliza padrão Publisher-Subscriber para comunicação assíncrona com o worker
 */
@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  private client: ClientProxy;

  constructor() {
    // Configuração do cliente RabbitMQ para publicação de eventos
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672'],
        queue: 'vehicle_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  /**
   * Publica evento de criação de veículo no RabbitMQ
   * O worker irá processar este evento de forma assíncrona
   */
  async publishVehicleCreated(vehicle: any) {
    try {
      this.client.emit('vehicle_created', vehicle);
      this.logger.log(`📤 Enviando evento de criação para o worker - Veículo ID: ${vehicle.id}`);
    } catch (error) {
      this.logger.error(`❌ Falha ao enviar evento de criação: ${error.message}`);
    }
  }

  /**
   * Publica evento de atualização de veículo no RabbitMQ
   */
  async publishVehicleUpdated(vehicle: any) {
    try {
      this.client.emit('vehicle_updated', vehicle);
      this.logger.log(`📤 Enviando evento de atualização para o worker - Veículo ID: ${vehicle.id}`);
    } catch (error) {
      this.logger.error(`❌ Falha ao enviar evento de atualização: ${error.message}`);
    }
  }

  /**
   * Publica evento de exclusão de veículo no RabbitMQ
   */
  async publishVehicleDeleted(vehicleId: number) {
    try {
      this.client.emit('vehicle_deleted', { id: vehicleId });
      this.logger.log(`📤 Enviando evento de exclusão para o worker - Veículo ID: ${vehicleId}`);
    } catch (error) {
      this.logger.error(`❌ Falha ao enviar evento de exclusão: ${error.message}`);
    }
  }
}
