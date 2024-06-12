import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-Add_Reservation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    CommonModule
  ],
  templateUrl: './Add_Reservation.component.html',
  styleUrls: ['./Add_Reservation.component.css']
})
export class Add_ReservationComponent implements OnInit {

  reservationForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validations();
  }
  validations(){
    this.reservationForm = this.fb.group({
      CustomerName:[{ value: '', disabled: true }, Validators.required],
      Vehicle_No: [{ value: '', disabled: true }, Validators.required],
      Status: [{ value: '', disabled: true }, Validators.required],
      Driver: ['', Validators.required],
      Employee: ['', Validators.required],
      Reservation_Date: [{ value: '', disabled: true }, Validators.required],
      Rate: [{ value: '', disabled: true }, Validators.required],
      Amount: [{ value: '', disabled: true }, Validators.required],
      No_of_days: [{ value: '', disabled: true }, Validators.required,],
      Start_date: [{ value: '', disabled: true }, Validators.required],
      End_date: [{ value: '', disabled: true }, Validators.required],
      Source: [{ value: '', disabled: true }, Validators.required],
      Destination: [{ value: '', disabled: true }, Validators.required],

    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      console.log('Form Submitted', this.reservationForm.value);
    }
  }

  onClear(): void {
    this.reservationForm.reset();
  }

}
