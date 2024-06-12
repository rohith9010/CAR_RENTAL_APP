import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IReservation } from '../../../../Interfaces/IReservation';
import { ReservationService } from '../../../../Services/ReservationService/reservation.service';

@Component({
  selector: 'app-Reservation_Details',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,RouterLinkActive, MatIconModule,FormsModule,ReactiveFormsModule],
  templateUrl: './Reservation_Details.component.html',
  styleUrls: ['./Reservation_Details.component.css']
})
export class Reservation_DetailsComponent implements OnInit {

  filteredReservationList: IReservation[]=[];
  searchQuery!: string;
  ReservationList:IReservation[]=[];

  constructor(private ReservationService:ReservationService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll(){
    // this.MakeService.getVehicleMake().subscribe((res)=> {
    //   this.vehicleList=res;
    //   this.search();
    // });
  }

  delete(id:number):void {
    // if (confirm('Are you sure you want to delete this item?')){
    //   this.modelservice.deleteVehicleModel(id).subscribe(()=>{
    //       console.log('Item deleted successfully');
    //       this.getAll();
    //     },
    //   );
    }
  }

  // search(): void {
  //   if (this.searchQuery.trim() ==='') {
  //     this.filteredReservationList = [...this.ReservationList];
  //   } else 
  //   {
  //     this.filteredReservationList = this.ReservationList.filter(reservation =>
  //       reservation.Name.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
  //     );
  //   }
  // }


