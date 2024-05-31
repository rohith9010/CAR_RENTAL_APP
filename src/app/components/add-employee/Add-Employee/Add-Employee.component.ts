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

  employeeTypes = ['Admin', 'User'];
  countries = ['USA', 'Canada', 'India'];
  states = ['California', 'Texas', 'New York'];
  cities = ['Los Angeles', 'Dallas', 'New York City'];

  constructor(private fb: FormBuilder) { }

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
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      bankName: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      pan: ['', [Validators.required, Validators.pattern('/[A-Z]{5}\d{4}[A-Z]{1}/i')]],
      privilages: this.fb.group({
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
      })
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log('Form Submitted', this.employeeForm.value);
    }
  }

  onClear(): void {
    this.employeeForm.reset({
      employeeName: '',
      employeeType: '',
      email: '',
      address: '',
      country: '',
      state: '',
      city: '',
      phoneNumber: '',
      mobileNumber: '',
      username: '',
      password: '',
      bankName: '',
      accountNumber: '',
      pan: '',
      privilages: {
        cities: false,
        states: false,
        countries: false,
        vehicles: false,
        make: false,
        models: false,
        employees: false,
        customers: false,
        owners: false,
        drivers: false,
        reservations: false,
        selectall: false
      }
    });
  }
}
