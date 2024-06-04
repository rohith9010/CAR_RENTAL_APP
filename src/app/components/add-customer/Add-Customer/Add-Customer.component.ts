import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
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
    CommonModule,
    CheckboxModule
  ],
  templateUrl: './Add-Customer.component.html',
  styleUrls: ['./Add-Customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  customerForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validations();
  }
  validations(){
    this.customerForm = this.fb.group({
      customerName:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')],Validators.maxLength(10)],
      mobileNumber: ['', [Validators.required, Validators.pattern('^(\\+?\\d{1,4}[\\s-]?)?(\\(?\\d{2,5}\\)?[\\s-]?)?\\d{6,8}$')]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      console.log('Form Submitted', this.customerForm.value);
    }
  }

  onClear(): void {
    this.customerForm.reset();
  }

}
