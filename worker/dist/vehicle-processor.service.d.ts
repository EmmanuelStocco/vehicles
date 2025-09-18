export declare class VehicleProcessorService {
    private readonly logger;
    handleVehicleCreated(data: any): Promise<void>;
    handleVehicleUpdated(data: any): Promise<void>;
    handleVehicleDeleted(data: any): Promise<void>;
    private simulateProcessing;
}
