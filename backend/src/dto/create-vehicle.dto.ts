import { IsString, IsNumber, IsNotEmpty, Length, Min, Max } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  @Length(7, 8)
  placa: string;

  @IsString()
  @IsNotEmpty()
  @Length(17, 17)
  chassi: string;

  @IsString()
  @IsNotEmpty()
  @Length(9, 11)
  renavam: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  ano: number;
}
