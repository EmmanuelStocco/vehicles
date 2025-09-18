import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  private client: ClientProxy;

  constructor() {
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

  async publishVehicleCreated(vehicle: any) {
    try {
      this.client.emit('vehicle_created', vehicle);
      this.logger.log(`Evento vehicle_created publicado: ${JSON.stringify(vehicle)}`);
    } catch (error) {
      this.logger.error(`Erro ao publicar evento vehicle_created: ${error.message}`);
    }
  }

  async publishVehicleUpdated(vehicle: any) {
    try {
      this.client.emit('vehicle_updated', vehicle);
      this.logger.log(`Evento vehicle_updated publicado: ${JSON.stringify(vehicle)}`);
    } catch (error) {
      this.logger.error(`Erro ao publicar evento vehicle_updated: ${error.message}`);
    }
  }

  async publishVehicleDeleted(vehicleId: number) {
    try {
      this.client.emit('vehicle_deleted', { id: vehicleId });
      this.logger.log(`Evento vehicle_deleted publicado: ${vehicleId}`);
    } catch (error) {
      this.logger.error(`Erro ao publicar evento vehicle_deleted: ${error.message}`);
    }
  }
}
