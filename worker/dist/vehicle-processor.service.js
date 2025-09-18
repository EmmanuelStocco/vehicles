"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var VehicleProcessorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleProcessorService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let VehicleProcessorService = VehicleProcessorService_1 = class VehicleProcessorService {
    constructor() {
        this.logger = new common_1.Logger(VehicleProcessorService_1.name);
    }
    async handleVehicleCreated(data) {
        this.logger.log(`🎉 EVENTO RECEBIDO - Novo veículo criado: ${JSON.stringify(data)}`);
        await this.simulateProcessing('CREATE', data);
    }
    async handleVehicleUpdated(data) {
        this.logger.log(`🎉 EVENTO RECEBIDO - Veículo atualizado: ${JSON.stringify(data)}`);
        await this.simulateProcessing('UPDATE', data);
    }
    async handleVehicleDeleted(data) {
        this.logger.log(`🎉 EVENTO RECEBIDO - Veículo deletado: ${JSON.stringify(data)}`);
        await this.simulateProcessing('DELETE', data);
    }
    async simulateProcessing(action, data) {
        return new Promise(resolve => {
            setTimeout(() => {
                this.logger.log(`Processamento concluído para ação ${action} do veículo ${data.id}`);
                resolve(true);
            }, 1000);
        });
    }
};
exports.VehicleProcessorService = VehicleProcessorService;
__decorate([
    (0, microservices_1.EventPattern)('vehicle_created'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VehicleProcessorService.prototype, "handleVehicleCreated", null);
__decorate([
    (0, microservices_1.EventPattern)('vehicle_updated'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VehicleProcessorService.prototype, "handleVehicleUpdated", null);
__decorate([
    (0, microservices_1.EventPattern)('vehicle_deleted'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VehicleProcessorService.prototype, "handleVehicleDeleted", null);
exports.VehicleProcessorService = VehicleProcessorService = VehicleProcessorService_1 = __decorate([
    (0, common_1.Injectable)()
], VehicleProcessorService);
//# sourceMappingURL=vehicle-processor.service.js.map