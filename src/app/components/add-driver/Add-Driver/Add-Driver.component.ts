import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

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
    CheckboxModule
  ],
  templateUrl: './Add-Driver.component.html',
  styleUrls: ['./Add-Driver.component.css']
})
export class AddDriverComponent implements OnInit {

  driverForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validations();
  }
  validations(){
    this.driverForm = this.fb.group({
      
      driverName:['', Validators.required],
      licenceNumber: ['', [Validators.required]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')],Validators.maxLength(10)],
      mobileNumber: ['', [Validators.required, Validators.pattern('^(\\+?\\d{1,4}[\\s-]?)?(\\(?\\d{2,5}\\)?[\\s-]?)?\\d{6,8}$')]],
      bankName: ['', [Validators.required,Validators.pattern('^[a-zA-Z\\s\\-\\\']{3,50}$')]],
      accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9,18}$')]],
      pan: ['', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]]

      });
  }

  onSubmit(): void {
    if (this.driverForm.valid) {
      console.log('Form Submitted', this.driverForm.value);
    }
  }

  onClear(): void {
    this.driverForm.reset();
  }


}
