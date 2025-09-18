import { Injectable, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

/**
 * Worker responsável por processar eventos de veículos recebidos via RabbitMQ
 * Implementa padrão Event-Driven Architecture para processamento assíncrono
 */
@Injectable()
export class VehicleProcessorService {
  private readonly logger = new Logger(VehicleProcessorService.name);

  /**
   * Processa eventos de criação de veículos
   * Recebe dados completos do veículo criado
   */
  @EventPattern('vehicle_created')
  async handleVehicleCreated(@Payload() data: any) {
    this.logger.log(`📥 Processando requisição via RabbitMQ - Novo veículo criado (ID: ${data.id})`); 
    
    await this.simulateProcessing('CREATE', data);
  }

  /**
   * Processa eventos de atualização de veículos
   * Recebe dados atualizados do veículo
   */
  @EventPattern('vehicle_updated')
  async handleVehicleUpdated(@Payload() data: any) {
    this.logger.log(`📥 Processando requisição via RabbitMQ - Veículo atualizado (ID: ${data.id})`);
    
    await this.simulateProcessing('UPDATE', data);
  }

  /**
   * Processa eventos de exclusão de veículos
   * Recebe apenas o ID do veículo deletado
   */
  @EventPattern('vehicle_deleted')
  async handleVehicleDeleted(@Payload() data: any) {
    this.logger.log(`📥 Processando requisição via RabbitMQ - Veículo deletado (ID: ${data.id})`);
    
    await this.simulateProcessing('DELETE', data);
  }

  /**
   * Simula processamento assíncrono de eventos 
   */
  private async simulateProcessing(action: string, data: any) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.logger.log(`✅ Processamento concluído - Ação: ${action} | Veículo ID: ${data.id}`);
        
        // Ideias para implementação:
        // - Enviar notificações por email para administradores
        // - Atualizar cache Redis com dados atualizados
        // - Gerar relatórios de auditoria
        // - Integrar com sistemas externos (CRM, ERP, etc.)
        // - Enviar dados para data warehouse
        // - Processar regras de negócio específicas
        
        resolve(true);
      }, 1000);
    });
  }
}
