import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { IVehicles } from '../../../../Interfaces/IVehicles';
import { IOwner } from '../../../../Interfaces/IOwner';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesService } from '../../../../Services/VehiclesService/Vehicles.service';
import { IVehicleTypes } from '../../../../Interfaces/IVehicleTypes';
import { IVehicleMake_ } from '../../../../Interfaces/IVehicleMake_';
import { IVehicleFuel } from '../../../../Interfaces/IVehicleFuel';
import { IVehicleCapacity } from '../../../../Interfaces/IVehicleCapacity';
import { VehicleFuelService } from '../../../../Services/VehicleFuelService/VehicleFuel.service';
import { VehicleCapacityService } from '../../../../Services/VehicleCapacityService/VehicleCapacity.service';
import { VehicleTypeService } from '../../../../Services/VehicleTypeService/VehicleType.service';
import { VehicleMakeService } from '../../../../Services/VehicleMakeservice/vehicle-make.service';
import { VehicleModelServiceService } from '../../../../Services/VehicleModelservice/vehicle-model-service.service';
import { CountryService } from '../../../../Services/CountriesService/Country.service';
import { StateserviceService } from '../../../../Services/StateService/stateservice.service';
import { CitiesService } from '../../../../Services/CityService/Cities.service';
import { OwnerServiceService } from '../../../../Services/OwnerService/owner-service.service';
import { IVehicleModel } from '../../../../Interfaces/IVehicleModel';
import { ICountry } from '../../../../Interfaces/ICountry';
import { IState } from '../../../../Interfaces/IState';

@Component({
  selector: 'app-Add-Vehicle',
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
  templateUrl: './Add-Vehicle.component.html',
  styleUrls: ['./Add-Vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  vehicleForm!: FormGroup;
  vehiclesList: IVehicles[] = [];
  filteredVehiclesList: IVehicles[] = [];
  

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
    DeleteStatus: '',
  };

  vehiclemake:IVehicleMake_={MakeNo:0,Name:'',Vehiclemodels:[{ModelNo:0,Name:"",MakeNo:0}]};
  country:ICountry={CountryNo:0,Country:'',States:[{StateNo: 0, state: "", CountryNo: 0,Citys: []}]};
  state:IState={StateNo:0,state:"",Citys:[],CountryNo:0};
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

  vehicleTypesList: IVehicleTypes[] = [];
  vehicleMakesList: IVehicleMake_[] = [];
  vehicleModelsList: IVehicleModel[] = [];
  ownersList: IOwner[] = [];
  countriesList: ICountry[] = [];
  statesList: IState[] = [];
  fuelTypesList: IVehicleFuel[] = [];
  capacitiesList: IVehicleCapacity[] = [];

  // vehicleTypes!: any[];
  // vehicleMakes!: any[];
  // vehicleModels!: any[];
  // owners!: any[];
  // countries!: any[];
  // states!: any[];
  // fuelTypes!: any[];
  // capacities!: any[];


  constructor(private fb: FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private vehicleservice:VehiclesService,
    private vehiclefueltypeservice:VehicleFuelService,
    private vehiclecapacityservice:VehicleCapacityService,
    private vehicletypesservice:VehicleTypeService,
    private vehiclemakeservice:VehicleMakeService,
    private vehiclemodelservice:VehicleModelServiceService,
    private countryservice:CountryService,
    private stateservice:StateserviceService,
    private cityservice:CitiesService,
    private ownersservice:OwnerServiceService) { }

  ngOnInit(): void {
    this.validations();
    this.fetchDropdownData();
    this.fetchVehicleData();
    
  }

  fetchVehicleData() {
    const VehicleId = this.route.snapshot.params['Id'];
    console.log(VehicleId);
    if(VehicleId){
      this.vehicleservice.GetVehiclesById(VehicleId).subscribe(res =>{
        this.vehicle=res;
        console.log(res);
        //this.fetchDropdownData();
        //this.getcountrybyId();
        this.getstatebyId();
        //this.getmakebyid();
        this.getownerbyid();
        //this.populateForm();
      });
    }
  }
  // getcountrybyId()
  // {
  //   this.countryservice.getCountryById(this.country.CountryNo).subscribe(val=>{
  //     this.country=val;
  //     console.log(this.country);
  //   })
  // }
  getstatebyId()
  {
    this.stateservice.GetStatebyId(this.vehicle.RegistrationState).subscribe(val=>{
      this.state=val;
      console.log(this.state);
    })
  }
  // getmakebyid()
  // {
  //   this.vehiclemakeservice.getById(this.vehiclemake.MakeNo).subscribe(val=>{
  //     this.vehiclemake=val;
  //     console.log(this.vehiclemake);
  //   })
  // }
  getownerbyid()
  {
    this.ownersservice.OwnerById(this.vehicle.OwnerNo).subscribe(val=>{
      this.owner=val;
      console.log(this.owner);
    })
  }
  validations(){
    this.vehicleForm = this.fb.group({
      
      Pic:['', Validators.required],
      Type: ['', [Validators.required]],
      Make: ['', Validators.required],
      Model: ['', Validators.required],
      Owner: ['', Validators.required],
      Registration_Number: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      Chasis_Number: ['', Validators.required],
      Year: ['', Validators.required],
      Color: ['', Validators.required,],
      Fuel: ['', Validators.required,],
      Capacity: ['', Validators.required],
      Mileage: ['', Validators.required],
      Daily_Rate: ['', Validators.required],
      Hourly_Rate: ['', Validators.required],
      Additional_Daily_Rate: ['', Validators.required],
      Additional_Hourly_Rate: ['', Validators.required]
      
      });
  }

  fetchDropdownData() {

    this.vehicletypesservice.GetVehicleTypes().subscribe(data =>{
        this.vehicleTypesList = data
      });

    this.vehiclemakeservice.getVehicleMake().subscribe(data =>{
        this.vehicleMakesList = data
      });

    this.vehiclemodelservice.getVehicleModel().subscribe(data =>{
        this.vehicleModelsList = data
      });

    this.ownersservice.GetOwner().subscribe(data =>{
        this.ownersList = data
      });

    this.countryservice.getCountries().subscribe(data =>{
        this.countriesList = data
      });

    this.stateservice.GetAllStates().subscribe(data => {
        this.statesList = data
      });

    this.vehiclefueltypeservice.GetVehicleFuel().subscribe(data => {
        this.fuelTypesList = data
      });

    this.vehiclecapacityservice.GetVehicleCapacity().subscribe(data => {
        this.capacitiesList = data
      });
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const formData = new FormData();
      formData.append('TypeNo', this.vehicleForm.value.Type);
      formData.append('ModelNo', this.vehicleForm.value.Model);
      formData.append('OwnerNo', this.vehicleForm.value.Owner);
      formData.append('RegistrationNo', this.vehicleForm.value.Registration_Number);
      formData.append('RegistrationState', this.vehicleForm.value.state);
      formData.append('ChassisNo', this.vehicleForm.value.Chasis_Number);
      formData.append('Year', this.vehicleForm.value.Year);
      formData.append('Color', this.vehicleForm.value.Color);
      formData.append('FuelNo', this.vehicleForm.value.Fuel);
      formData.append('CapacityNo', this.vehicleForm.value.Capacity);
      formData.append('Mileage', this.vehicleForm.value.Mileage);
      formData.append('DailyRate', this.vehicleForm.value.Daily_Rate);
      formData.append('HourlyRate', this.vehicleForm.value.Hourly_Rate);
      formData.append('AdditionalDailyRate', this.vehicleForm.value.Additional_Daily_Rate);
      formData.append('AddtionalHourlyRate', this.vehicleForm.value.Additional_Hourly_Rate);
      formData.append('Pic', this.vehicleForm.get('Pic')?.value);

      this.vehicleservice.AddVehicles(formData).subscribe(response => {
        console.log('Vehicle added successfully', response);
        this.router.navigate(['/Vehicle_Details']);
      });
    }
  }

  onClear(): void {
    this.vehicleForm.reset();
  }

  Update(): void {
    if (this.vehicleForm.valid) {
      console.log("hi");
      const formData = new FormData();
      formData.append('TypeNo', this.vehicleForm.value.Type);
      formData.append('ModelNo', this.vehicleForm.value.Model);
      formData.append('OwnerNo', this.vehicleForm.value.Owner);
      formData.append('RegistrationNo', this.vehicleForm.value.Registration_Number);
      formData.append('RegistrationState', this.vehicleForm.value.state);
      formData.append('ChassisNo', this.vehicleForm.value.Chasis_Number);
      formData.append('Year', this.vehicleForm.value.Year);
      formData.append('Color', this.vehicleForm.value.Color);
      formData.append('FuelNo', this.vehicleForm.value.Fuel);
      formData.append('CapacityNo', this.vehicleForm.value.Capacity);
      formData.append('Mileage', this.vehicleForm.value.Mileage);
      formData.append('DailyRate', this.vehicleForm.value.Daily_Rate);
      formData.append('HourlyRate', this.vehicleForm.value.Hourly_Rate);
      formData.append('AdditionalDailyRate', this.vehicleForm.value.Additional_Daily_Rate);
      formData.append('AddtionalHourlyRate', this.vehicleForm.value.Additional_Hourly_Rate);
      formData.append('Pic', this.vehicleForm.get('Pic')?.value);

      this.vehicleservice.UpdateVehicles(formData).subscribe(response => {
        console.log('Vehicle updated successfully', response);
        this.router.navigate(['/Vehicle_Details']);
      });
    }
  }

  // populateForm(): void {
  //   this.vehicleForm.patchValue({
  //     Pic: this.vehicle.Pic,
  //     Type: this.vehicle.TypeNo,
  //     Make: this.vehiclemake.MakeNo,
  //     Model: this.vehicle.ModelNo,
  //     Owner: this.vehicle.OwnerNo,
  //     Registration_Number: this.vehicle.RegistrationNo,
  //     country: this.country.CountryNo,
  //     state: this.vehicle.RegistrationState,
  //     Chasis_Number: this.vehicle.ChassisNo,
  //     Year: this.vehicle.Year,
  //     Color: this.vehicle.Color,
  //     Fuel: this.vehicle.FuelNo,
  //     Capacity: this.vehicle.CapacityNo,
  //     Mileage: this.vehicle.Mileage,
  //     Daily_Rate: this.vehicle.DailyRate,
  //     Hourly_Rate: this.vehicle.HourlyRate,
  //     Additional_Daily_Rate: this.vehicle.AdditionalDailyRate,
  //     Additional_Hourly_Rate: this.vehicle.AddtionalHourlyRate
  //   });
  // }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.vehicleForm.patchValue({
        Pic: file
      });
    }
  }
}
