import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validations();
  }
  validations(){
    this.vehicleForm = this.fb.group({
      
      Image:['', Validators.required],
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
      Milage: ['', Validators.required],
      Daily_Rate: ['', Validators.required],
      Hourly_Rate: ['', Validators.required],
      Additional_Daily_Rate: ['', Validators.required],
      Additional_Hourly_Rate: ['', Validators.required]
      
      });
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      console.log('Form Submitted', this.vehicleForm.value);
    }
  }

  onClear(): void {
    this.vehicleForm.reset();
  }

}
