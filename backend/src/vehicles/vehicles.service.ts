import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { EventsService } from '../events/events.service';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    private eventsService: EventsService,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    // Verificar se já existe veículo com a mesma placa, chassi ou renavam
    const existingVehicle = await this.vehicleRepository.findOne({
      where: [
        { placa: createVehicleDto.placa },
        { chassi: createVehicleDto.chassi },
        { renavam: createVehicleDto.renavam },
      ],
    });

    if (existingVehicle) {
      throw new ConflictException('Já existe um veículo com esta placa, chassi ou renavam');
    }

    const vehicle = this.vehicleRepository.create(createVehicleDto);
    const savedVehicle = await this.vehicleRepository.save(vehicle);

    console.log('Veículo criado:', savedVehicle);

    // Publicar evento para o worker processar
    await this.eventsService.publishVehicleCreated(savedVehicle);

    return savedVehicle;
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException(`Veículo com ID ${id} não encontrado`);
    }
    return vehicle;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.findOne(id);

    // Verificar se os novos valores não conflitam com outros veículos
    if (updateVehicleDto.placa || updateVehicleDto.chassi || updateVehicleDto.renavam) {
      const existingVehicle = await this.vehicleRepository.findOne({
        where: [
          updateVehicleDto.placa ? { placa: updateVehicleDto.placa } : null,
          updateVehicleDto.chassi ? { chassi: updateVehicleDto.chassi } : null,
          updateVehicleDto.renavam ? { renavam: updateVehicleDto.renavam } : null,
        ].filter(Boolean),
      });

      if (existingVehicle && existingVehicle.id !== id) {
        throw new ConflictException('Já existe um veículo com esta placa, chassi ou renavam');
      }
    }

    Object.assign(vehicle, updateVehicleDto);
    const updatedVehicle = await this.vehicleRepository.save(vehicle);

    console.log('Veículo atualizado:', updatedVehicle);

    // Publicar evento para o worker processar
    await this.eventsService.publishVehicleUpdated(updatedVehicle);

    return updatedVehicle;
  }

  async remove(id: number): Promise<void> {
    const vehicle = await this.findOne(id);
    await this.vehicleRepository.remove(vehicle);

    console.log('Veículo deletado:', vehicle);

    // Publicar evento para o worker processar
    await this.eventsService.publishVehicleDeleted(id);
  }
}
