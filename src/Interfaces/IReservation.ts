import { ICity } from "./ICity";
import { ICustomer } from "./ICustomer";
import { IDriver } from "./IDriver";
import { IEmployee } from "./IEmployee";
import { IVehicles } from "./IVehicles";

export interface IReservation {
   
  RentalNo: number;
  CustomerNo: number;
  Customer?: ICustomer; 
  VehicleNo: number;
  vehicles?: IVehicles;
  DriverNo: number;
  Driver?: IDriver; 
  EmployeeNo: number;
  Employee?: IEmployee; 
  ReservationDate: Date;
  VehicleRate: number;
  NoOfDays: number;
  StartDate: Date;
  EndDate: Date;
  NoOfKMS: number;
  StartKMS: number;
  EndKMS: number;
  SourceLocation: number;
  SourceCity?: ICity; 
  DestinationLocation: number;
  DestinationCity?: ICity; 
  TravelPurpose?: string;
  Amount: number;
  TransactionNumber?: string;
  Status?: string;
}



