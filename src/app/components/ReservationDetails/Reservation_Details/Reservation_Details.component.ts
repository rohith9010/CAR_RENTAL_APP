import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IReservation } from '../../../../Interfaces/IReservation';
import { ReservationService } from '../../../../Services/ReservationService/reservation.service';
import { customerservice } from '../../../../Services/CustomerService/Customer.service';
import { ICustomer } from '../../../../Interfaces/ICustomer';
import { VehiclesService } from '../../../../Services/VehiclesService/Vehicles.service';
import { IVehicles } from '../../../../Interfaces/IVehicles';
import { DriverService } from '../../../../Services/DriverService/Driver.service';
import { IDriver } from '../../../../Interfaces/IDriver';
import { EmployeeService } from '../../../../Services/EmployeeService/employee.service';
import { IEmployee } from '../../../../Interfaces/IEmployee';
import { CitiesService } from '../../../../Services/CityService/Cities.service';
import { ICity } from '../../../../Interfaces/ICity';

@Component({
  selector: 'app-Reservation_Details',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,RouterLinkActive, MatIconModule,FormsModule,ReactiveFormsModule],
  templateUrl: './Reservation_Details.component.html',
  styleUrls: ['./Reservation_Details.component.css']
})
export class Reservation_DetailsComponent implements OnInit {

  filteredReservationList: IReservation[]=[];
  searchQuery: string='';
  ReservationList!:IReservation[];
  CustomerList:ICustomer[]=[];
  VehicleList:IVehicles[]=[];
  DriverList:IDriver[]=[];
  EmployeeList:IEmployee[]=[];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  CitiesList:ICity[]=[];
  ReservationListID:IReservation[]=[]




  constructor(private ReservationService:ReservationService,
     private CustomerService : customerservice,
     private VehicleService :VehiclesService, 
     private DriverService : DriverService, 
     private Employeeservice: EmployeeService,
     private cityservice: CitiesService ) { }

  ngOnInit() {
    this.ReservationDetails();
    
  }

  ReservationDetails()
  {
    this.ReservationService.ReservationDetails().subscribe((res:IReservation[])=>
      {
          this.ReservationList=res;
          console.log('Reservations fetched:', this.ReservationList);         
          this.search();
      });

  }
  delete(id:number):void {
    if (confirm('Are you sure you want to delete this item?')){
      this.ReservationService.DeleteReservation(id).subscribe(()=>{
          console.log('Item deleted successfully');
          this.ReservationDetails();
        },
      );
    }
  }

  search(): void {
    if (this.searchQuery.trim() ==='') {
      this.filteredReservationList = [...this.ReservationList];
    } else 
    {
      this.filteredReservationList = this.ReservationList.filter(reservation =>
        reservation.vehicles?.RegistrationNo.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
      );
    }
  }

  getDisplayedRentals(): IReservation[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredReservationList.slice(startIndex, endIndex);
  }
}


