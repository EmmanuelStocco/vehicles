import { Injectable, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Injectable()
export class VehicleProcessorService {
  private readonly logger = new Logger(VehicleProcessorService.name);

  @EventPattern('vehicle_created')
  async handleVehicleCreated(@Payload() data: any) {
    this.logger.log(`🎉 EVENTO RECEBIDO - Novo veículo criado: ${JSON.stringify(data)}`);
    
    // Aqui você pode implementar lógicas de processamento
    // como: enviar email, atualizar cache, gerar relatórios, etc.
    
    // Simular processamento
    await this.simulateProcessing('CREATE', data);
  }

  @EventPattern('vehicle_updated')
  async handleVehicleUpdated(@Payload() data: any) {
    this.logger.log(`🎉 EVENTO RECEBIDO - Veículo atualizado: ${JSON.stringify(data)}`);
    
    // Simular processamento
    await this.simulateProcessing('UPDATE', data);
  }

  @EventPattern('vehicle_deleted')
  async handleVehicleDeleted(@Payload() data: any) {
    this.logger.log(`🎉 EVENTO RECEBIDO - Veículo deletado: ${JSON.stringify(data)}`);
    
    // Simular processamento
    await this.simulateProcessing('DELETE', data);
  }

  private async simulateProcessing(action: string, data: any) {
    // Simular processamento assíncrono
    return new Promise(resolve => {
      setTimeout(() => {
        this.logger.log(`Processamento concluído para ação ${action} do veículo ${data.id}`);
        
        // Aqui você pode implementar lógicas específicas:
        // - Enviar notificações por email
        // - Atualizar cache Redis
        // - Gerar relatórios
        // - Integrar com sistemas externos
        // - Logs de auditoria
        // - etc.
        
        resolve(true);
      }, 1000);
    });
  }
}
