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
  filteredVehiclesList: IVehicles[] = [];
  imagePreview: string | ArrayBuffer | null = null;

  vehicleTypesList: IVehicleTypes[] = [];
  vehicleMakesList: IVehicleMake_[] = [];
  vehicleModelsList: IVehicleModel[] = [];
  ownersList: IOwner[] = [];
  countriesList: ICountry[] = [];
  statesList: IState[] = [];
  fuelTypesList: IVehicleFuel[] = [];
  capacitiesList: IVehicleCapacity[] = [];
  
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
    private ownersservice:OwnerServiceService) { }

  ngOnInit(): void {
    this.validations();
    this.fetchDropdownData();
    this.fetchVehicleData();
    
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
  fetchVehicleData() {
    const VehicleId = this.route.snapshot.params['Id'];
    if(VehicleId){
      this.vehicleservice.GetVehiclesById(VehicleId).subscribe(res =>{
        this.vehicle=res;

        this.getcountrybyId();
        this.getstatebyId();
        this.getmakebyid();
        this.getownerbyid();
        this.setImagePreview();

      });
    }
  }
  getcountrybyId()
  {
    this.countryservice.getCountryById(this.vehicle.RegistrationState).subscribe(val=>{
      this.country=val;
      console.log(this.country);
      this.vehicleForm.patchValue({
        country: this.country.CountryNo
      });
    });
  }
  getstatebyId()
  {
    this.stateservice.GetStatebyId(this.vehicle.RegistrationState).subscribe(val=>{
      this.state=val;
      console.log(this.state);
    })
  }
  getmakebyid()
  {
    this.vehiclemakeservice.getById(this.vehicle.ModelNo).subscribe(val=>{
      this.vehiclemake=val;
      console.log(this.vehiclemake);
      this.vehicleForm.patchValue({
        vehiclemake: this.vehiclemake.MakeNo
      });
    })
  }
  getownerbyid()
  {
    this.ownersservice.OwnerById(this.vehicle.OwnerNo).subscribe(val=>{
      this.owner=val;
      console.log(this.owner);
    })
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.vehicleForm.patchValue({
        Pic: file
      });
      this.vehicleForm.get('Pic')?.updateValueAndValidity();
    }
  }
  setImagePreview() {
    if (this.vehicle.Pic && this.vehicle.Pic.byteLength > 0) {
      const base64String = btoa(String.fromCharCode(...this.vehicle.Pic));
      this.imagePreview = `data:image/jpeg;base64,${base64String}`;
    }
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

  Update(): void {
    if (this.vehicleForm.valid) {

      const formData = new FormData();

      formData.append('VehicleNo', this.vehicle.VehicleNo.toString());
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

  onClear(): void {
    this.vehicleForm.reset();
  }
}
