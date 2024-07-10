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
import { OwnerServiceService } from '../../../../Services/OwnerService/owner-service.service';
import { IVehicles } from '../../../../Interfaces/IVehicles';
import { IVehicleTypes } from '../../../../Interfaces/IVehicleTypes';
import { IVehicleMake_ } from '../../../../Interfaces/IVehicleMake_';
import { IVehicleModel } from '../../../../Interfaces/IVehicleModel';
import { IOwner } from '../../../../Interfaces/IOwner';
import { IVehicleFuel } from '../../../../Interfaces/IVehicleFuel';
import { IVehicleCapacity } from '../../../../Interfaces/IVehicleCapacity';
import { EmployeeTypeService } from '../../../../Services/EmployeeTypeService/employee-type.service';
import { VehiclesService } from '../../../../Services/VehiclesService/Vehicles.service';
import { VehicleMakeService } from '../../../../Services/VehicleMakeservice/vehicle-make.service';
import { VehicleModelServiceService } from '../../../../Services/VehicleModelservice/vehicle-model-service.service';

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
  filteredvehiclelist: IVehicles[]=[];
  Vehicletypelist:IVehicleTypes[]=[];
  vehiclemakelist:IVehicleMake_[]=[];
  vehiclemodellist:IVehicleModel[]=[];
  ownerslist:IOwner[]=[];
  statelist:IState[]=[];
  vehicleFuellist:IVehicleFuel[]=[];
  capacitylist:IVehicleCapacity[]=[];

  vehicle:IVehicles={
    VehicleNo:0,
    OwnerNo:0,
    ModelNo:0,
    TypeNo:0,
    Year:0,
    Color:'',
    FuelNo:0,
    CapacityNo:0,
    Mileage:0,
    Pic: new Uint8Array,
    RegistrationNo:'',
    RegistrationState:0,
    ChassisNo:'',
    DailyRate:0,
    HourlyRate:0,
    AdditionalDailyRate:0,
    AddtionalHourlyRate:0,
    DeleteStatus:'',
    
  };

  vehiclemake:IVehicleMake_={
    MakeNo:0,
    Name:'',
    Vehiclemodels:[{ModelNo:0,Name:"",MakeNo:0}]
  };

  country:ICountry={CountryNo:0,
    Country:'',
    States:[{StateNo: 0, state: "", CountryNo: 0,Citys: []}]
  };

  state:IState={StateNo:0,
    state:"",Citys:[],
    CountryNo:0
  };
  owner:IOwner={
    OwnerNo: 0,
    Name: '',
    Address1: '',
    Address2: '',
    CityNo: 0,
    StateNo: 0,
    Pincode: '',
    CountryNo: 0,
    PhoneNumber: '',
    MobileNumber: '',
    BankName: '',
    BankAccount: '',
    PAN: '',
    DeleteStatus: ''
  };




 




  constructor(private fb: FormBuilder,
     private Route:ActivatedRoute,
     private Router:Router,
     private Employeetypeservice:EmployeeTypeService,
     private Cititesservice:CitiesService,
     private stateservice:StateserviceService,
     private countryservice:CountryService,
     private vehicleservice:VehiclesService,
     private vehiclemakesservice:VehicleMakeService,
     private vehiclemodelservice:VehicleModelServiceService,
     

     
     
  ) { }

  ngOnInit(): void {
    this.validations();
  }
  validations(){
    this.employeeForm = this.fb.group({
      employeeName:['', Validators.required],
      employeeType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')],Validators.maxLength(10)],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
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
        reservations: [false],
        selectall:[false]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log('Form Submitted', this.employeeForm.value);
    }
  }

  onClear(): void {
    this.employeeForm.reset();
  }
}
