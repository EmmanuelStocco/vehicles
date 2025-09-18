import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesModule } from './vehicles/vehicles.module';
import { EventsModule } from './events/events.module';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'vehicles.db',
      entities: [Vehicle],
      synchronize: true,
    }),
    VehiclesModule,
    EventsModule,
  ],
})
export class AppModule {}
