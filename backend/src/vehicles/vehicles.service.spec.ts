import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from '../entities/vehicle.entity';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { EventsService } from '../events/events.service';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let repository: Repository<Vehicle>;
  let eventsService: EventsService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockEventsService = {
    publishVehicleCreated: jest.fn(),
    publishVehicleUpdated: jest.fn(),
    publishVehicleDeleted: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: mockRepository,
        },
        {
          provide: EventsService,
          useValue: mockEventsService,
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    repository = module.get<Repository<Vehicle>>(getRepositoryToken(Vehicle));
    eventsService = module.get<EventsService>(EventsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createVehicleDto: CreateVehicleDto = {
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
      expect(mockEventsService.publishVehicleCreated).toHaveBeenCalledWith(vehicle);
      expect(result).toEqual(vehicle);
    });

    it('should throw ConflictException when vehicle with same placa exists', async () => {
      const existingVehicle = { id: 1, placa: 'ABC1234' };
      mockRepository.findOne.mockResolvedValue(existingVehicle);

      await expect(service.create(createVehicleDto)).rejects.toThrow(ConflictException);
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

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateVehicleDto: UpdateVehicleDto = {
      modelo: 'Civic Type R',
      ano: 2024,
    };

    it('should update a vehicle successfully', async () => {
      const existingVehicle = { id: 1, placa: 'ABC1234', chassi: '12345678901234567', renavam: '12345678901', modelo: 'Civic', marca: 'Honda', ano: 2023 };
      const updatedVehicle = { ...existingVehicle, ...updateVehicleDto };
      
      mockRepository.findOne.mockResolvedValueOnce(existingVehicle); // findOne for existing vehicle
      mockRepository.findOne.mockResolvedValueOnce(null); // findOne for conflict check
      mockRepository.save.mockResolvedValue(updatedVehicle);

      const result = await service.update(1, updateVehicleDto);

      expect(mockRepository.save).toHaveBeenCalledWith(updatedVehicle);
      expect(mockEventsService.publishVehicleUpdated).toHaveBeenCalledWith(updatedVehicle);
      expect(result).toEqual(updatedVehicle);
    });

    it('should throw NotFoundException when vehicle not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update(999, updateVehicleDto)).rejects.toThrow(NotFoundException);
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
      expect(mockEventsService.publishVehicleDeleted).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when vehicle not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
