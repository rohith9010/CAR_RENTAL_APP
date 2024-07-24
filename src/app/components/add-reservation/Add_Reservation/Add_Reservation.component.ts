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

  constructor(private fb: FormBuilder,
              private reservationservice : ReservationService,
              private route: Router,
              private router:ActivatedRoute, 
              private Customerservice: customerservice,
              private Driverservice:DriverService,
              private Employeeservice:EmployeeService,
            ) { }

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
  ngOnInit(): void {
    this.validations();
    this.getbyId();
  
  }
  validations(){
    this.reservationForm = this.fb.group({
      CustomerName:[{ value: '', disabled: true }, Validators.required],
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
    // getDriver()
    // {
    //   this.Driverservice.getAll().subscribe(res =>{
    //     this.CustomerList=res;
    //     console.log(res);
    //   })
    // }
    // getDriverById()
    // {
    //   this.Customerservice.CustomerById(this.customer.CustomerNo).subscribe(res =>{
    //     this.customer=res;
    //     console.log(res);
    //   })
    // }
}
