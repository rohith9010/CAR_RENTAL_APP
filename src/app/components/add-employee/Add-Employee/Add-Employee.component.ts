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
    OwnerDetailsComponent,
    CommonModule
  ],
  templateUrl: './Add-Employee.component.html',
  styleUrls: ['./Add-Employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  employeeTypes = ['Admin', 'User'];
  countries = ['USA', 'Canada', 'India']; // Example data, replace with real data
  states = ['California', 'Texas', 'New York']; // Example data, replace with real data
  cities = ['Los Angeles', 'Dallas', 'New York City'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      bankName: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      pan: ['', Validators.required],
      permissions: this.fb.group({
        cities: [false],
        states: [false],
        countries: [false],
        vehicles: [false],
        make: [false],
        models: [false],
        employees: [false],
        customers: [false],
        owners: [false],
        drivers: [false],
        reservations: [false]
      })
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log('Form Submitted', this.employeeForm.value);
      // Handle form submission logic here
    }
  }

  onClear(): void {
    this.employeeForm.reset();
  }
}
