import { ICity } from "./ICity";
import { ICountry } from "./ICountry";
import { IEmployeetype } from "./IEmployeetype";
import { IState } from "./IState";

export interface IEmployee {

    EmployeeNo:number;
    EmployeeName:string;
    EmployeeTypeNo:number;
    employeetypes?:IEmployeetype;
    AddressLine1:string;
    AddressLine2:string;
    CitiesNo:number;
    cities?:ICity;
    StateNo:number;
    states?:IState;
    Pincode:string;
    CountryNo:number;
    countries?:ICountry;
    PhoneNo:string;
    MobileNo:string;
    EmailAddress:string;
    BankName:string;
    BankAccount:string;
    PAN:string;
    UserName:string;
    Password:string;
    City:string;
    State:string;
    Country:string;
    Vehicle:string;
    VehicleMakes:string;
    vehicleModel:string;
    Employees:string;
    Customers:string;
    Owners:string;
    Drivers:string;
    Rentals:string;
    LastLogin:Date|null;
    Status:string;
    DeleteStatus:string;
}
