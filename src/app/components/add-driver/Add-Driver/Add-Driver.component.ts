import { Component, OnInit } from '@angular/core';
import { ValidationErrors, AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { IDriver } from '../../../../Interfaces/IDriver';
import { DriverService } from '../../../../Services/DriverService/Driver.service';
import { ICountry } from '../../../../Interfaces/ICountry';
import { CountryService } from '../../../../Services/CountriesService/Country.service';
import { IState } from '../../../../Interfaces/IState';
import { StateserviceService } from '../../../../Services/StateService/stateservice.service';
import { ICity } from '../../../../Interfaces/ICity';
import { CitiesService } from '../../../../Services/CityService/Cities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverDetailsComponent } from '../../DriverDetails/Driver-Details/Driver-Details.component';

@Component({
  selector: 'app-Add-Driver',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    CommonModule,
    CheckboxModule,
    DriverDetailsComponent
  ],
  templateUrl: './Add-Driver.component.html',
  styleUrls: ['./Add-Driver.component.css']
})
export class AddDriverComponent implements OnInit {

  driverForm!: FormGroup;
  driver: IDriver = {
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

  state: IState = { StateNo: 0, state: "", Citys: [], CountryNo: 0 };
  city: ICity = { CityNo: 0, CityName: "", StateNo: 0 };
  country: ICountry = { CountryNo: 0, Country: "", States: [] };

  driverList!: [];
  CitiesList!: ICity[];
  StatesList!: IState[];
  CountryList!: ICountry[];
  countries!: any[];
  states!: any[];
  cities!: any[];
  drivers!: any[];

  constructor(
    private fb: FormBuilder,
    private driverService: DriverService,
    private countryService: CountryService,
    private stateservice: StateserviceService,
    private cityservice: CitiesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.validations();
    this.GetAllCountries();
    this.GetAllStates();
    this.GetAllCities();
    this.DriverGetID();
  }

  validations() {
    this.driverForm = this.fb.group({
      driverName: ['', Validators.required],
      licenceNumber: ['', [Validators.required]],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      bankName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s\\-\\\']{3,50}$')]],
      accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9,18}$')]],
      pan: ['', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]]
    });
  }

  GetAllCountries() {
    this.countryService.getCountries().subscribe(
      res => {
        this.CountryList = res;
        console.log(res);
      },
      err => {
        console.error('Error fetching countries', err);
      }
    );
  }

  GetAllStates() {
    this.stateservice.GetAllStates().subscribe(
      res => {
        this.StatesList = res;
        console.log(res);
      },
      err => {
        console.error('Error fetching states', err);
      }
    );
  }

  GetAllCities() {
    this.cityservice.getCities().subscribe(
      res => {
        this.CitiesList = res;
        console.log(res);
      },
      err => {
        console.error('Error fetching cities', err);
      }
    );
  }

  GetCountryByID() {
    this.countryService.getCountryById(this.driver.CountryNo).subscribe(
      res => {
        this.country = res;
        console.log(res);
      },
      err => {
        console.error('Error fetching country by ID', err);
      }
    );
  }

  GetStateByID() {
    this.stateservice.GetStatebyId(this.driver.StateNo).subscribe(
      res => {
        this.state = res;
        console.log(res);
      },
      err => {
        console.error('Error fetching state by ID', err);
      }
    );
  }

  GetCityByID() {
    this.cityservice.getCitiesById(this.driver.CityNo).subscribe(
      res => {
        this.city = res;
        console.log(res);
      },
      err => {
        console.error('Error fetching city by ID', err);
      }
    );
  }

  onSubmit(): void {
    if (this.driverForm.valid) {
      this.driver.CountryNo = this.country.CountryNo;
      this.driver.StateNo = this.state.StateNo;
      this.driver.CityNo = this.city.CityNo;

      this.driverService.AddDriver(this.driver).subscribe(
        res => {
          this.driver = res;
          console.log(res);
          this.router.navigate(['/Driver_Details']);
        },
        err => {
          console.error('Error adding driver', err);
        }
      );
    }
  }

  DriverGetID()
  {
    const DriverId=this.route.snapshot.params['Id'];

    if(DriverId)
      {
        this.driverService.DriverById(DriverId).subscribe( res => {
          this.driver=res;
          this.GetCountryByID();
          this.GetStateByID();
          this.GetCityByID();
          console.log(res);
        })
      }
  }


  UpDateDriver()
  {
    if(this.driverForm.valid)
      {
        this.driver.CountryNo=this.country.CountryNo;
        this.driver.StateNo=this.state.StateNo;
        this.driver.CityNo=this.city.CityNo;

        this.driverService.UpdateDriver(this.driver).subscribe( res =>{
          this.driver=res;
          console.log(res);
          this.router.navigate(['/Driver_Details'])
        })
      }
  }
  onClear(): void {
    this.driverForm.reset();
  }
}
