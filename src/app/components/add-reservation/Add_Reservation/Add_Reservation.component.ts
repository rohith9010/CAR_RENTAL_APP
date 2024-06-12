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
      CustomerName:['', Validators.required],
      Vehicle_No: ['', Validators.required],
      Status: ['', Validators.required],
      Driver: ['', Validators.required],
      Employee: ['', Validators.required],
      Reservation_Date: ['', Validators.required],
      Rate: ['', Validators.required],
      Amount: ['', Validators.required],
      No_of_days: ['', Validators.required,],
      Start_date: ['', Validators.required],
      End_date: ['', Validators.required],
      Source: ['', Validators.required],
      Destination: ['', Validators.required],

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
