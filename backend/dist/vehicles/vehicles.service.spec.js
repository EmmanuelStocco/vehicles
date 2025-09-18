"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const vehicles_service_1 = require("./vehicles.service");
const vehicle_entity_1 = require("../entities/vehicle.entity");
describe('VehiclesService', () => {
    let service;
    let repository;
    const mockRepository = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        remove: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                vehicles_service_1.VehiclesService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(vehicle_entity_1.Vehicle),
                    useValue: mockRepository,
                },
            ],
        }).compile();
        service = module.get(vehicles_service_1.VehiclesService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(vehicle_entity_1.Vehicle));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        const createVehicleDto = {
            placa: 'ABC1234',
            chassi: '12345678901234567',
            renavam: '12345678901',
            modelo: 'Civic',
            marca: 'Honda',
            ano: 2023,
        };
        it('should create a vehicle successfully', async () => {
            const vehicle = { id: 1, ...createVehicleDto, createdAt: new Date(), updatedAt: new Date() };
            mockRepository.findOne.mockResolvedValue(null);
            mockRepository.create.mockReturnValue(vehicle);
            mockRepository.save.mockResolvedValue(vehicle);
            const result = await service.create(createVehicleDto);
            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: [
                    { placa: createVehicleDto.placa },
                    { chassi: createVehicleDto.chassi },
                    { renavam: createVehicleDto.renavam },
                ],
            });
            expect(mockRepository.create).toHaveBeenCalledWith(createVehicleDto);
            expect(mockRepository.save).toHaveBeenCalledWith(vehicle);
            expect(result).toEqual(vehicle);
        });
        it('should throw ConflictException when vehicle with same placa exists', async () => {
            const existingVehicle = { id: 1, placa: 'ABC1234' };
            mockRepository.findOne.mockResolvedValue(existingVehicle);
            await expect(service.create(createVehicleDto)).rejects.toThrow(common_1.ConflictException);
        });
    });
    describe('findAll', () => {
        it('should return all vehicles', async () => {
            const vehicles = [
                { id: 1, placa: 'ABC1234', chassi: '12345678901234567', renavam: '12345678901', modelo: 'Civic', marca: 'Honda', ano: 2023 },
                { id: 2, placa: 'DEF5678', chassi: '98765432109876543', renavam: '98765432109', modelo: 'Corolla', marca: 'Toyota', ano: 2022 },
            ];
            mockRepository.find.mockResolvedValue(vehicles);
            const result = await service.findAll();
            expect(mockRepository.find).toHaveBeenCalledWith({
                order: { createdAt: 'DESC' },
            });
            expect(result).toEqual(vehicles);
        });
    });
    describe('findOne', () => {
        it('should return a vehicle by id', async () => {
            const vehicle = { id: 1, placa: 'ABC1234', chassi: '12345678901234567', renavam: '12345678901', modelo: 'Civic', marca: 'Honda', ano: 2023 };
            mockRepository.findOne.mockResolvedValue(vehicle);
            const result = await service.findOne(1);
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toEqual(vehicle);
        });
        it('should throw NotFoundException when vehicle not found', async () => {
            mockRepository.findOne.mockResolvedValue(null);
            await expect(service.findOne(999)).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('update', () => {
        const updateVehicleDto = {
            modelo: 'Civic Type R',
            ano: 2024,
        };
        it('should update a vehicle successfully', async () => {
            const existingVehicle = { id: 1, placa: 'ABC1234', chassi: '12345678901234567', renavam: '12345678901', modelo: 'Civic', marca: 'Honda', ano: 2023 };
            const updatedVehicle = { ...existingVehicle, ...updateVehicleDto };
            mockRepository.findOne.mockResolvedValueOnce(existingVehicle);
            mockRepository.findOne.mockResolvedValueOnce(null);
            mockRepository.save.mockResolvedValue(updatedVehicle);
            const result = await service.update(1, updateVehicleDto);
            expect(mockRepository.save).toHaveBeenCalledWith(updatedVehicle);
            expect(result).toEqual(updatedVehicle);
        });
        it('should throw NotFoundException when vehicle not found', async () => {
            mockRepository.findOne.mockResolvedValue(null);
            await expect(service.update(999, updateVehicleDto)).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('remove', () => {
        it('should remove a vehicle successfully', async () => {
            const vehicle = { id: 1, placa: 'ABC1234', chassi: '12345678901234567', renavam: '12345678901', modelo: 'Civic', marca: 'Honda', ano: 2023 };
            mockRepository.findOne.mockResolvedValue(vehicle);
            mockRepository.remove.mockResolvedValue(vehicle);
            await service.remove(1);
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(mockRepository.remove).toHaveBeenCalledWith(vehicle);
        });
        it('should throw NotFoundException when vehicle not found', async () => {
            mockRepository.findOne.mockResolvedValue(null);
            await expect(service.remove(999)).rejects.toThrow(common_1.NotFoundException);
        });
    });
});
//# sourceMappingURL=vehicles.service.spec.js.map