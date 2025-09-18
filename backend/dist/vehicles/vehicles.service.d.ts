import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { EventsService } from '../events/events.service';
export declare class VehiclesService {
    private vehicleRepository;
    private eventsService;
    constructor(vehicleRepository: Repository<Vehicle>, eventsService: EventsService);
    create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
    findAll(): Promise<Vehicle[]>;
    findOne(id: number): Promise<Vehicle>;
    update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle>;
    remove(id: number): Promise<void>;
}
