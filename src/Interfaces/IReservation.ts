import { IVehicles } from "./IVehicles";

export interface IReservation {
    RentalNo: number;
    CustomerNo: number;
    VehicleNo: number;
    DriverNo: number;
    EmployeeNo: number;
    ReservationDate :Date;
    VehicleRate: number;
    NoOfDays: number;
    StartDate: Date;
    EndDate: Date;
    NoOfKMS: number;
    StartKMS: number;
    EndKMS: number;
    SourceLocation: number;
    DestinationLocation: number;
    TravelPurpose: string;
    Amount: number;
    TransactionNumber: string;
    Status: string;
}
