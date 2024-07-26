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




  constructor(private ReservationService:ReservationService,
     private CustomerService : customerservice,
     private VehicleService :VehiclesService, 
     private DriverService : DriverService, 
     private Employeeservice: EmployeeService,
     private cityservice: CitiesService ) { }

  ngOnInit() {
    //this.getAll();
    this.ReservationDetails();
    this.GetAllVehicles();
    this.GetAllCustomers();
    this.GetAllCities()
    
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


  GetAllCustomers(){
    this.CustomerService.GetCustomer().subscribe((res)=>{
      this.CustomerList=res;
    });
  }

  GetAllVehicles()
  {
    this.VehicleService.GetVehicles().subscribe((res)=>{
      this.VehicleList=res;
    })
  }
  //to get registrationNo through vehicleNo
  getVehicleReg(vehicleNo: number): string {
    const vehicle = this.VehicleList.find(v => v.VehicleNo === vehicleNo);
    return vehicle ? vehicle.RegistrationNo : '';
  }

  getCustomerName(customerNo: number): string {
    const customer = this.CustomerList.find(c => c.CustomerNo === customerNo);
    return customer ? customer.Name : '';
  }

  getSourceName(sourceId: number): string {
    const source = this.CitiesList.find(v => v.CityNo === sourceId);
    return source ? source.CityName : '';
  }

  getDestinationName(DestinationId: number): string {
    const destination = this.CitiesList.find(v => v.CityNo === DestinationId);
    return destination ? destination.CityName : '';
  }
  
  GetAllCities(){
    this.cityservice.getCities().subscribe((res)=>{
      this.CitiesList=res;
      this.search();
    })
}

  GetAllDrivers(){
      // this.DriverService.GetAllDrivers().subscribe((res)=>{
      //   this.DriverList=res;
      //   this.search();
      // })
  }

  GetAllEmployees()
  {
    // this.Employeeservice.GetAllEmployees().subscribe((res)=>{
    //   this.EmployeeList=res;
    //   this.search();
    // })
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
    // if (this.searchQuery.trim() ==='') {
    //   this.filteredReservationList = [...this.ReservationList];
    // } else 
    // {
    //   this.filteredReservationList = this.ReservationList.filter(reservation =>
    //     reservation.Vehicle?.RegistrationNo.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
    //   );
    // }
  }

  getDisplayedRentals(): IReservation[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredReservationList.slice(startIndex, endIndex);
  }



}


