export declare class EventsService {
    private readonly logger;
    private client;
    constructor();
    publishVehicleCreated(vehicle: any): Promise<void>;
    publishVehicleUpdated(vehicle: any): Promise<void>;
    publishVehicleDeleted(vehicleId: number): Promise<void>;
}
