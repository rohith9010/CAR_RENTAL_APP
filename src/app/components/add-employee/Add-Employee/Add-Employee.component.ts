import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { StateserviceService } from '../../../../Services/StateService/stateservice.service';
import { CountryService } from '../../../../Services/CountriesService/Country.service';
import { CitiesService } from '../../../../Services/CityService/Cities.service';
import { ICity } from '../../../../Interfaces/ICity';
import { ICountry } from '../../../../Interfaces/ICountry';
import { IState } from '../../../../Interfaces/IState';
import { ActivatedRoute,Router } from '@angular/router';
import { EmployeeTypeService } from '../../../../Services/EmployeeTypeService/employee-type.service';
import { IEmployee } from '../../../../Interfaces/IEmployee';
import { IEmployeetype } from '../../../../Interfaces/IEmployeetype';
import { EmployeeService } from '../../../../Services/EmployeeService/employee.service';

@Component({
  selector: 'app-Add-Employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    CommonModule,
    CheckboxModule
  ],
  templateUrl: './Add-Employee.component.html',
  styleUrls: ['./Add-Employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  CountryList!:ICountry[];
  statelist!:IState[];
  citylist!:ICity[];
  employeeTypelist!:IEmployeetype[];

  employee:IEmployee={
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


  constructor(
    private fb: FormBuilder,
     private Route:ActivatedRoute,
     private Router:Router,
     private Employeetypeservice:EmployeeTypeService,
     private employeeservice:EmployeeService,
     private Cititesservice:CitiesService,
     private stateservice:StateserviceService,
     private countryservice:CountryService,
     ) { }

  ngOnInit(): void {
    this.validations();
    this.getCountries();
    this.GetCities();
    this.GetStates();
    this.getemployeetypes();
    this.getbyid();
  }
  validations(){
    this.employeeForm = this.fb.group({
      employeeName:['', Validators.required],
      employeeType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address1: ['', Validators.required],
      address2:[''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode:['',[Validators.required,Validators.pattern('^[0-9]{6}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      mobileNumber: [''],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      bankName: ['', [Validators.required,Validators.pattern('^[a-zA-Z\\s\\-\\\']{3,50}$')]],
      accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9,18}$')]],
      pan: ['', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]],

        cities: ['',false],
        states: ['',false],
        countries: ['',false],
        vehicles: ['',false],
        make: [false],
        models: [false],
        employees: [false],
        customers: [false],
        owners: [false],
        drivers: [false],
        reservations: [false]
    });
  }

  getCountries() {
    this.countryservice.getCountries().subscribe(res => {
      this.CountryList = res;
    });
  }

  GetStates() {
    this.stateservice.GetAllStates().subscribe(res => {
      this.statelist = res;
    });
  }

  GetCities() {
    this.Cititesservice.getCities().subscribe(res => {
      this.citylist = res;
    });
  }

  getemployeetypes()
  {
    this.Employeetypeservice.GetEmployeeType().subscribe(res=>{
      this.employeeTypelist=res;
    });
  }

  getbyid()
  {
    const empid=this.Route.snapshot.params['Id'];
    if(empid){
      this.employeeservice.EmployeebyId(empid).subscribe(res=>{
        this.employee=res;
        this.employeeForm.patchValue({

          "employeeName":this.employee.EmployeeName,
          "employeeType":this.employee.EmployeeTypeNo,
          "email":this.employee.EmailAddress,
          "address1":this.employee.AddressLine1,
          "address2":this.employee.AddressLine2,
          "country":this.employee.CountryNo,
          "state":this.employee.StateNo,
          "city":this.employee.CitiesNo,
          "pincode":this.employee.Pincode,
          "phoneNumber":this.employee.PhoneNo,
          "mobileNumber":this.employee.MobileNo,
          "username":this.employee.UserName,
          "password":this.employee.Password,
          "bankName":this.employee.BankName,
          "accountNumber":this.employee.BankAccount,
          "pan":this.employee.PAN 

        });
      });
    }
  }



  onSubmit(): void {
    if (this.employeeForm.valid) {
        console.log('Form Submitted', this.employeeForm.value);
        const formValue = this.employeeForm.value;
        this.employee = {
          ...this.employee,
          
          EmployeeName: formValue.employeeName,
          EmployeeTypeNo: formValue.employeeType,
          EmailAddress: formValue.email,
          AddressLine1: formValue.address1,
          AddressLine2: formValue.address2,
          CountryNo: formValue.country,
          StateNo: formValue.state,
          CitiesNo: formValue.city,
          Pincode:formValue.pincode,
          PhoneNo: formValue.phoneNumber,
          MobileNo: formValue.mobileNumber,
          UserName: formValue.username,
          Password: formValue.password,
          BankName: formValue.bankName,
          BankAccount: formValue.accountNumber,
          PAN: formValue.pan,
        };
  
        console.log(this.employee);
        this.employeeservice.AddEmployee(this.employee).subscribe(res => {
          this.employee = res;
          this.Router.navigate(['/Employee_Details'])
        });
    }
  }
  
  Update(): void{
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      this.employee = {
        ...this.employee,
  
        EmployeeName: formValue.employeeName,
        EmployeeTypeNo: formValue.employeeType,
        EmailAddress: formValue.email,
        AddressLine1: formValue.address1,
        AddressLine2: formValue.address2,
        CountryNo: formValue.country,
        StateNo: formValue.state,
        CitiesNo: formValue.city,
        Pincode: formValue.pincode,
        PhoneNo: formValue.phoneNumber,
        MobileNo: formValue.mobileNumber,
        UserName: formValue.username,
        Password: formValue.password,
        BankName: formValue.bankName,
        BankAccount: formValue.accountNumber,
        PAN: formValue.pan,
      };

      console.log(this.employee);
      this.employeeservice.UpdateEmployee(this.employee).subscribe(res => {
        this.employee = res;
        this.Router.navigate(['/Employee_Details'])
      });
    }
  }
  onPanInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }

  onClear(): void {
    this.employeeForm.reset();
  }
}
