import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CustomerDetailsComponent } from '../../CustomerDetails/Customer-Details/Customer-Details.component';
import { CommonModule } from '@angular/common';
import { StateserviceService } from '../../../../Services/StateService/stateservice.service';
import { CountryService } from '../../../../Services/CountriesService/Country.service';
import { CitiesService } from '../../../../Services/CityService/Cities.service';
import { ICity } from '../../../../Interfaces/ICity';
import { ICountry } from '../../../../Interfaces/ICountry';
import { IState } from '../../../../Interfaces/IState';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from '../../../../Interfaces/ICustomer';
import { customerservice } from '../../../../Services/CustomerService/Customer.service';

@Component({
  selector: 'app-Add-Customer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    CustomerDetailsComponent,
    CommonModule
  ],
  templateUrl: './Add-Customer.component.html',
  styleUrls: ['./Add-Customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  customerForm!: FormGroup;

  state: IState = { StateNo: 0, state: "", Citys: [], CountryNo: 0 };
  city: ICity = { CityNo: 0, CityName: "", StateNo: 0 }
  country: ICountry = {
    CountryNo: 0, Country: "",
    States: []
  }
  customer: ICustomer = {
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
  };

  customerList!: [];
  CitiesList!: ICity[];
  StatesList!: IState[];
  CountryList!: ICountry[];
  countries!: any[];
  states!: any[];
  cities!: any[];
  customers!: any[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private countryservice: CountryService,
    private stateservice: StateserviceService,
    private cityservice: CitiesService,
    private customerservice: customerservice
  ) { }

  ngOnInit(): void {
    this.validations();
    this.getCountries();
    this.GetStates();
    this.GetCities();
    this.getbyId();
  }
  onSubmit(): void {
    if (this.customerForm.valid) {
      console.log('Form Submitted', this.customerForm.value);
      this.customer.CountryNo = this.country.CountryNo;
      this.customer.StateNo = this.state.StateNo;
      this.customer.CityNo = this.city.CityNo;

      console.log(this.customer);
      this.customerservice.AddCustomer(this.customer).subscribe(res => {
        this.customer = res;
        this.router.navigate(['/Customer_Details'])
      })
    }
  }
  validations() {
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      addressLine1: ['', Validators.required],
      addressLine2: ['',],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required,Validators.pattern('^[0-9]{6}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      mobileNumber: ['',Validators.pattern('^[0-9]{10}$')],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
    });
  }

  onClear(): void {
    this.customerForm.reset();
  }

  getCountries() {
    this.countryservice.getCountries().subscribe(res => {
      this.CountryList = res;
    });
  }

  GetStates() {
    this.stateservice.GetAllStates().subscribe(res => {
      this.StatesList = res;
    });
  }

  GetCities() {
    this.cityservice.getCities().subscribe(res => {
      this.CitiesList = res;
    });
  }

  getcountrybyId() {
    this.countryservice.getCountryById(this.customer.CountryNo).subscribe(val => {
      this.country = val;
      console.log(this.country);
    })
  }

  getstatebyId() {
    this.stateservice.GetStatebyId(this.customer.StateNo).subscribe(val => {
      this.state = val;
      console.log(this.state);
    })
  }

  getcitybyId() {
    this.cityservice.getCitiesById(this.customer.CityNo).subscribe(val => {
      this.city = val;
      console.log(this.city);
    })
  }

  getbyId() {
    const Customerid = this.route.snapshot.params['Id'];

    if (Customerid) {
      this.customerservice.CustomerById(Customerid).subscribe(res => {
        this.customer = res;
        console.log(res);
        this.getcountrybyId();
        this.getstatebyId();
        this.getcitybyId()
      })
    }
  }

 

 
  Update() : void {
    if (this.customerForm.valid) {
      console.log('Form Submitted', this.customerForm.value);
      this.customer.CountryNo=this.country.CountryNo;
      this.customer.StateNo=this.state.StateNo;
      this.customer.CityNo=this.city.CityNo;
        
     console.log(this.customer);
      this.customerservice.UpdateCustomer(this.customer).subscribe(res =>{
        this.customer=res;           
        this.router.navigate(['/Customer_Details']);
      });

    }
  }

}
