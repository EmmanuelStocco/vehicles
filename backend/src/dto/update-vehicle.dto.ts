import { CreateVehicleDto } from './create-vehicle.dto';

export class UpdateVehicleDto {
  placa?: string;
  chassi?: string;
  renavam?: string;
  modelo?: string;
  marca?: string;
  ano?: number;
}
