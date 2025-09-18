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
var EventsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let EventsService = EventsService_1 = class EventsService {
    constructor() {
        this.logger = new common_1.Logger(EventsService_1.name);
        this.client = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672'],
                queue: 'vehicle_queue',
                queueOptions: {
                    durable: false,
                },
            },
        });
    }
    async publishVehicleCreated(vehicle) {
        try {
            this.client.emit('vehicle_created', vehicle);
            this.logger.log(`Evento vehicle_created publicado: ${JSON.stringify(vehicle)}`);
        }
        catch (error) {
            this.logger.error(`Erro ao publicar evento vehicle_created: ${error.message}`);
        }
    }
    async publishVehicleUpdated(vehicle) {
        try {
            this.client.emit('vehicle_updated', vehicle);
            this.logger.log(`Evento vehicle_updated publicado: ${JSON.stringify(vehicle)}`);
        }
        catch (error) {
            this.logger.error(`Erro ao publicar evento vehicle_updated: ${error.message}`);
        }
    }
    async publishVehicleDeleted(vehicleId) {
        try {
            this.client.emit('vehicle_deleted', { id: vehicleId });
            this.logger.log(`Evento vehicle_deleted publicado: ${vehicleId}`);
        }
        catch (error) {
            this.logger.error(`Erro ao publicar evento vehicle_deleted: ${error.message}`);
        }
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = EventsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EventsService);
//# sourceMappingURL=events.service.js.map