import { Module } from '@nestjs/common';
import { VehicleProcessorService } from './vehicle-processor.service';

@Module({
  providers: [VehicleProcessorService],
})
export class AppModule {}
