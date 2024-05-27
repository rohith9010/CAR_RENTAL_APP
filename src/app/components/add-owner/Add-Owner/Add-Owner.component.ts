import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { OwnerDetailsComponent } from '../../Owner/Owner-Details/Owner-Details.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Add-Owner',
  standalone: true,
  imports: [
    ReactiveFormsModule,
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
  countries: string[] = ['Country 1', 'Country 2', 'Country 3'];  // Replace with actual data
  states: string[] = ['State 1', 'State 2', 'State 3'];  // Replace with actual data
  cities: string[] = ['City 1', 'City 2', 'City 3'];  // Replace with actual data

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ownerForm = this.fb.group({
      ownerName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      bank: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      pan: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.ownerForm.valid) {
      console.log('Form Submitted', this.ownerForm.value);
    }
  }

  onClear(): void {
    this.ownerForm.reset();
  }

}
