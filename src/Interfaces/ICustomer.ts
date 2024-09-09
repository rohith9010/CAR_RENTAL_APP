export interface ICustomer {

    CustomerNo:number;
    Name:string;
    EmailAddress:string;
    AddressLine1:string;
    AddressLine2:string;
    CityNo:number;
    StateNo:number;
    PinCode:string;
    CountryNo:number;
    PhoneNo:string;
    MobileNo:string;
    RegistrationDate:Date|null;
    UserName:string;
    Password:string;
    LastLogin:Date|null;
    DeleteStatus:string;
}