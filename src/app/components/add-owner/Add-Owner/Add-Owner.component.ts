import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { OwnerDetailsComponent } from '../../Owner/Owner-Details/Owner-Details.component';
import { CommonModule } from '@angular/common';
import { StateserviceService } from '../../../../Services/StateService/stateservice.service';
import { CountryService } from '../../../../Services/CountriesService/Country.service';
import { CitiesService } from '../../../../Services/CityService/Cities.service';
import { ICity } from '../../../../Interfaces/ICity';
import { ICountry } from '../../../../Interfaces/ICountry';
import { IState } from '../../../../Interfaces/IState';
import { ActivatedRoute,Router } from '@angular/router';
import { IOwner } from '../../../../Interfaces/IOwner';
import { OwnerServiceService } from '../../../../Services/OwnerService/owner-service.service';

@Component({
  selector: 'app-Add-Owner',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    OwnerDetailsComponent,
    CommonModule
  ],
  templateUrl: './Add-Owner.component.html',
  styleUrls: ['./Add-Owner.component.css']
})
export class AddOwnerComponent implements OnInit {

  ownerForm!: FormGroup;
 
  state:IState={StateNo:0,state:"",Citys:[],CountryNo:0};
  city:ICity={CityNo:0,CityName:"",StateNo:0}
  country:ICountry={
    CountryNo: 0, Country: "",
    States: []
  }
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
  ownerList!:[];
  CitiesList!:ICity[];
  StatesList!:IState[];
  CountryList!:ICountry[];
 countries!: any[];
 states!: any[];
 cities! :any [];
 owners! :any[];


  constructor(private fb: FormBuilder,private route:ActivatedRoute,private router:Router,private countryservice:CountryService,private stateservice :StateserviceService,private cityservice: CitiesService, private ownerservice : OwnerServiceService  ){ } 


  ngOnInit(): void {
    this.validations();
    this.getAll();
    this.GetStates();
    this.GetCities();
    this.getbyId();
    
  }
  
  onSubmit(): void {
    if (this.ownerForm.valid) {
      console.log('Form Submitted', this.ownerForm.value);
      this.owner.CountryNo=this.country.CountryNo;
      this.owner.StateNo=this.state.StateNo;
      this.owner.CityNo=this.city.CityNo;
        
     console.log(this.owner);
      this.ownerservice.AddOwner(this.owner).subscribe(res =>{
        this.owner=res;
        this.router.navigate(['/Owner_details'])
      })
    }
  }
  
 validations(){
  this.ownerForm = this.fb.group({
    ownerName: ['', Validators.required],
    addressLine1: ['', Validators.required],
    addressLine2: ['', Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    pincode: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    bank: ['', [Validators.required,Validators.pattern('^[a-zA-Z\\s\\-\\\']{3,50}$')]],
    accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9,18}$')]],
    pan: ['', [Validators.required,Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]],
  });
 }
  onClear(): void {
    this.ownerForm.reset();
  }
  getAll(){
   
    this.countryservice.getCountries().subscribe(res=> {
      this.CountryList=res;
      });
  }

  GetStates(){
    this.stateservice.GetAllStates().subscribe(res =>{
      this.StatesList=res;
    });
  }

  GetCities(){
    this.cityservice.getCities().subscribe(res =>{
      this.CitiesList=res;
    })
  }

  getcountrybyId()
  {
    this.countryservice.getCountryById(this.owner.CountryNo).subscribe(val=>{
      this.country=val;
      console.log(this.country);
    })
  }

  getstatebyId()
  {
    this.stateservice.GetStatebyId(this.owner.StateNo).subscribe(val=>{
      this.state=val;
      console.log(this.state);
    })
  }

  getcitybyid()
  {
    this.cityservice.getCitiesById(this.owner.CityNo).subscribe(val =>{
      this.city=val;
    })
  }
  getbyId()
  {
    const Ownerid = this.route.snapshot.params['Id'];

    if(Ownerid){
      this.ownerservice.OwnerById(Ownerid).subscribe(res =>{
        this.owner=res;
        console.log(res);
        this.getcountrybyId();
        this.getstatebyId();
        this.getcitybyid()
      })
    }
    
  }

  Update() : void {
    if (this.ownerForm.valid) {
      console.log('Form Submitted', this.ownerForm.value);
      this.owner.CountryNo=this.country.CountryNo;
      this.owner.StateNo=this.state.StateNo;
      this.owner.CityNo=this.city.CityNo;
        
     console.log(this.owner);
      this.ownerservice.UpdateOwner(this.owner).subscribe(res =>{
        this.owner=res;           
        this.router.navigate(['/Owner_details'])
      })

    }
  }

}
