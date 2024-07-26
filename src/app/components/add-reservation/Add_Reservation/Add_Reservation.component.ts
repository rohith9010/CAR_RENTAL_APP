import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { IReservation } from '../../../../Interfaces/IReservation';
import { ReservationService } from '../../../../Services/ReservationService/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { customerservice } from '../../../../Services/CustomerService/Customer.service';
import { ICustomer } from '../../../../Interfaces/ICustomer';
import { IEmployee } from '../../../../Interfaces/IEmployee';
import { DriverService } from '../../../../Services/DriverService/Driver.service';
import { EmployeeService } from '../../../../Services/EmployeeService/employee.service';
import { IDriver } from '../../../../Interfaces/IDriver';
import { ICity } from '../../../../Interfaces/ICity';
import { CitiesService } from '../../../../Services/CityService/Cities.service';
import { IVehicles } from '../../../../Interfaces/IVehicles';
import { VehiclesService } from '../../../../Services/VehiclesService/Vehicles.service';

@Component({
  selector: 'app-Add_Reservation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    CommonModule
  ],
  templateUrl: './Add_Reservation.component.html',
  styleUrls: ['./Add_Reservation.component.css']
})
export class Add_ReservationComponent implements OnInit {

  reservationForm!: FormGroup;
  CustomerList:ICustomer[]=[];
  DriverList!:IDriver[];
  EmployeeList!:IEmployee[];
  CitiesList!:ICity[];
  VehicleList:IVehicles[]=[];

vehicle:IVehicles={
  VehicleNo: 0,
  OwnerNo: 0,
  ModelNo: 0,
  TypeNo: 0,
  Year: 0,
  Color: '',
  FuelNo: 0,
  CapacityNo: 0,
  Mileage: 0,
  Pic: new Uint8Array(),
  RegistrationNo: '',
  RegistrationState: 0,
  ChassisNo: '',
  DailyRate: 0,
  HourlyRate: 0,
  AdditionalDailyRate: 0,
  AddtionalHourlyRate: 0,
  DeleteStatus: ''
}
  customer:ICustomer={
    CustomerNo: 0,
    Name: '',
    EmailAddress: '',
    Address1: '',
    Address2: '',
    CityNo: 0,
    StateNo: 0,
    Pincode: '',
    CountryNo: 0,
    PhoneNumber: '',
    MobileNumber: '',
    RegistrationDate: '',
    UserName: '',
    Password: '',
    DateTimeLastLogin: '',
    DeleteStatus: ''
  }
  reservation:IReservation={
    RentalNo: 0,
    CustomerNo: 0,
    VehicleNo: 0,
    DriverNo: 0,
    EmployeeNo: 0,
    ReservationDate: new Date(),
    VehicleRate: 0,
    NoOfDays: 0,
    StartDate: new Date(),
    EndDate: new Date(),
    NoOfKMS: 0,
    StartKMS: 0,
    EndKMS: 0,
    SourceLocation: 0,
    DestinationLocation: 0,
    TravelPurpose: '',
    Amount: 0,
    TransactionNumber: '',
    Status: ''
  }

  Driver:IDriver={
    DriverNo: 0,
    DriverName: '',
    LicenceNo: '',
    AddressLine1: '',
    AddressLine2: '',
    CityNo: 0,
    StateNo: 0,
    CountryNo: 0,
    PinCode: '',
    PhoneNo: '',
    MobileNo: '',
    BankName: '',
    BankAccount: '',
    PAN: '',
    DeleteStatus: ''
  }

  Employee:IEmployee={
    EmployeeNo: 0,
    EmployeeName: '',
    EmployeeTypeNo: 0,
    AddressLine1: '',
    AddressLine2: '',
    CitiesNo: 0,
    StateNo: 0,
    Pincode: '',
    CountryNo: 0,
    PhoneNo: '',
    MobileNo: '',
    EmailAddress: '',
    BankName: '',
    BankAccount: '',
    PAN: '',
    UserName: '',
    Password: '',
    City: '',
    State: '',
    Country: '',
    Vehicle: '',
    VehicleMakes: '',
    vehicleModel: '',
    Employees: '',
    Customers: '',
    Owners: '',
    Drivers: '',
    Rentals: '',
    LastLogin: null,
    Status: '',
    DeleteStatus: ''
  }

  Source:ICity={
    CityNo: 0,
    CityName: '',
    StateNo: 0
  }

  Destination:ICity={
    CityNo: 0,
    CityName: '',
    StateNo: 0
  }

  City:ICity={
    CityNo: 0,
    CityName: '',
    StateNo: 0
  }

  constructor(private fb: FormBuilder,
              private reservationservice : ReservationService,
              private route: Router,
              private router:ActivatedRoute, 
              private Customerservice: customerservice,
              private Driverservice:DriverService,
              private Employeeservice:EmployeeService,
              private Cityservice: CitiesService,
              private vehcileService: VehiclesService
            ) { }

  
  ngOnInit(): void {
    this.validations();
    this.getbyId();
    this.GetallCustomers();
    this.getDriver();
    this.getEmployee();
    this.getCities();
    this.getVechicle()

  
  }
  validations(){
    this.reservationForm = this.fb.group({
      CustomerName:[{ value: '',  }, Validators.required],
      Vehicle_No: [{ value: '', disabled: true }, Validators.required],
      Status: [{ value: '', disabled: true }, Validators.required],
      Driver: ['', Validators.required],
      Employee: ['', Validators.required],
      Reservation_Date: [{ value: '', disabled: true }, Validators.required],
      Rate: [{ value: '', disabled: true }, Validators.required],
      Amount: [{ value: '', disabled: true }, Validators.required],
      No_of_days: [{ value: '', disabled: true }, Validators.required,],
      Start_date: [{ value: '', disabled: true }, Validators.required],
      End_date: [{ value: '', disabled: true }, Validators.required],
      Source: [{ value: '', disabled: true }, Validators.required],
      Destination: [{ value: '', disabled: true }, Validators.required],

    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      console.log('Form Submitted', this.reservationForm.value);

    }
  }

  onClear(): void {
    this.reservationForm.reset();
  }

  getbyId() {
    const reservationId = this.router.snapshot.params['id'];

    if (reservationId) {
      this.reservationservice.ReservationById(reservationId).subscribe(res => {
        this.reservation = res;
        console.log(res);
        this.GetCustomerByID();
        this.getDriverById();
        this.getEmployeeById();
        this.getCitiesId();
        this.getVehiclebyId()
      })
    }
  }
  
  
    GetallCustomers(){
      this.Customerservice.GetCustomer().subscribe(res =>{
        this.CustomerList=res;
        console.log(res);
      })
    }

    GetCustomerByID(){
      this.Customerservice.CustomerById(this.customer.CustomerNo).subscribe(res =>{
        this.customer=res;
        console.log(res);
      })
    }
    getDriver()
    {
      this.Driverservice.GetDriver().subscribe(res =>{
        this.DriverList=res;
        console.log(res);
      })
    }
    getDriverById()
    {
      this.Driverservice.DriverById(this.Driver.DriverNo).subscribe(res =>{
        this.Driver=res;
        console.log(res);
      })
    }
    getEmployee()
    {
      this.Employeeservice.GetEmployee().subscribe(res =>{
        this.EmployeeList=res;
        console.log(res);
      })
    }
    getEmployeeById()
    {
      this.Employeeservice.EmployeebyId(this.Employee.EmployeeNo).subscribe(res =>{
        this.Employee=res;
        console.log(res);
      })
    }
    getCities()
    {
      this.Cityservice.getCities().subscribe(res =>{
        this.CitiesList=res;
        console.log(res);
      })
    }
    getCitiesId()
    {
      this.Cityservice.getCitiesById(this.City.CityNo).subscribe(res =>{
        this.City=res;
        console.log(res);
      })
    }

    getVechicle()
    {
      this.vehcileService.GetVehicles().subscribe(res =>{
        this.VehicleList=res;
        console.log(res);
      })
    }
    

    getVehiclebyId()
    {
      this.vehcileService.GetVehiclesById(this.vehicle.VehicleNo).subscribe(val=>{
        this.vehicle=val;
        console.log(this.vehicle);
      })
    }

    getVehicleReg(vehicleNo: number): string {
      const vehicle = this.VehicleList.find(v => v.VehicleNo === vehicleNo);
      return vehicle ? vehicle.RegistrationNo : 'Unknown';
    }

}
