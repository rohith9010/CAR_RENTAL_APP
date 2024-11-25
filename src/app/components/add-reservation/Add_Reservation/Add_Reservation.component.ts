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
import { Console } from 'node:console';
import { ThisReceiver } from '@angular/compiler';
import { of } from 'rxjs';
import { timingSafeEqual } from 'node:crypto';

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

  registrationNo?:string;

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
    AddressLine1: '',
    AddressLine2: '',
    CityNo: 0,
    StateNo: 0,
    PinCode: '',
    CountryNo: 0,
    PhoneNo: '',
    MobileNo: '',
    RegistrationDate: null,
    UserName: '',
    Password: '',
    LastLogin: null,
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
    Status: '',
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
    this.getVehicle();
    this.initializeForm(); 
    // Call initializeForm here for Reservation_Rate
    
  this.reservationForm.get('Start_date')?.valueChanges.subscribe(() => this.calculateNoOfDays());
  this.reservationForm.get('End_date')?.valueChanges.subscribe(() => this.calculateNoOfDays());

   
  }
  validations(){
    this.reservationForm = this.fb.group({
      CustomerName:[{ value: '',  }, Validators.required],
      Vehicle_No: [{ value: '',  }, Validators.required],
      RegistrationNo: ['', Validators.required],  // Ensure this matches
      Status: [{ value: '',  }, Validators.required],
      Driver: ['', Validators.required],
      Employee: ['',],
      RentalNo: ['', Validators.required],
      Reservation_Date: [{ value: '',   }, Validators.required],
      Rate: [{ value: '',   }, Validators.required],
      Amount: [{ value: '',   }, Validators.required],
      No_of_days: [{ value: '',   }, Validators.required],
      Start_date: [{ value: '',   }, Validators.required],
      End_date: [{ value: '',   }, Validators.required],
      Source: [{ value: '',   }, ],
      Destination: [{ value: '',   }, ],

    });
  
  }

  initializeForm() {
    // Assuming this.reservation.vehicles?.DailyRate comes from an external source
    const rate = this.reservation.vehicles?.DailyRate ?? 0;
    this.vehicle.DailyRate = rate;

    // Patch the value to the form
    this.reservationForm.patchValue({
      Rate: rate
    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      
      console.log('Form Submitted', this.reservationForm.value);
      this.Update();
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
        console.log(this.reservation);
        
        this.reservationForm.patchValue({
          "RentalNo" :this.reservation.RentalNo,
          "CustomerName" : this.reservation.CustomerNo,
          "Vehicle_No" : this.reservation.VehicleNo,
          "Status" : this.reservation.Status,
          "Driver":this.reservation.DriverNo,
          "Employee" : this.reservation.EmployeeNo,
          "Reservation_Date" :this.reservation.ReservationDate,
          "Rate" : this.reservation.vehicles?.DailyRate,
          "Amount": this.reservation.vehicles?.DailyRate,
          " No_of_days": this.reservation.NoOfDays,
          "Start_date": this.reservation.StartDate,
          "End_date": this.reservation.EndDate,
          "Source" :this.reservation.SourceCity?.CityName,
          "Destination" : this.reservation.DestinationCity?.CityName,
          
        });
        this.calculateNoOfDays();

      })
    }
  }
  

    GetallCustomers(){
      this.Customerservice.GetCustomer().subscribe(res =>{
        this.CustomerList=res;
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
    
    getEmployee()
    {
      this.Employeeservice.GetEmployee().subscribe(res =>{
        this.EmployeeList=res;
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
    
    getVehicle() {
      this.reservationForm.get('Vehicle_No')?.valueChanges.subscribe(vehicleNo => {
        if (vehicleNo) {
          this.vehcileService.GetVehiclesById(vehicleNo).subscribe(vehicle => {
            console.log('Fetched vehicle:', vehicle);
            this.vehicle = vehicle;
            this.reservationForm.patchValue({
              RegistrationNo: vehicle.RegistrationNo
            });
          }, error => {
            console.error('Error fetching vehicle:', error); // Log any errors
          });
        }
      });
    }
    
    Update(){
      console.log("HI");

      if(this.reservationForm.valid){
        const formValue = this.reservationForm.value;
        this.reservation={
          ...this.reservation,

          RentalNo : formValue.RentalNo,
          CustomerNo : formValue.CustomerName,
          VehicleNo : formValue.Vehicle_No,
          Status : formValue.Status,
          DriverNo : formValue.Driver,
          EmployeeNo : formValue.Employee,
          ReservationDate : formValue.Reservation_Date,
          VehicleRate : formValue.Rate,
          Amount : formValue.Amount,
          NoOfDays : formValue.No_of_days,
          StartDate : formValue.Start_date,
          EndDate : formValue.End_date,
          SourceCity : formValue.Source.CityNo,
          DestinationCity : formValue.Destination.CityNo
        };
        console.log(this.reservation);
          this.reservationservice.UpdateReservation(this.reservation).subscribe(res=>{
            this.reservation=res;
            this.route.navigate(['/Reservation_Details'])
      }); 
  }
}

  calculateNoOfDays() {
    const startDate = new Date(this.reservationForm.get('Start_date')?.value);
    const endDate = new Date(this.reservationForm.get('End_date')?.value);
  
    if (startDate && endDate && endDate >= startDate) {
      // Calculate the difference in milliseconds and convert to days
      const timeDiff = endDate.getTime() - startDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
  
      // Patch the calculated number of days to the form
      this.reservationForm.patchValue({
        No_of_days: daysDiff
      });
    } else {
      // Reset the number of days if the dates are invalid
      this.reservationForm.patchValue({
        No_of_days: 0
      });
    }
  }
   
}