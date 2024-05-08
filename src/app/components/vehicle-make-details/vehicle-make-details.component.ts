import { Component, OnInit, model } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { VehicleMakeService } from '../../../Services/VehicleMakeservice/vehicle-make.service';
import { IVehicleMake_ } from '../../../Interfaces/IVehicleMake_';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-make-details',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, MatIconModule,FormsModule,ReactiveFormsModule],
  templateUrl: './vehicle-make-details.component.html',
  styleUrl: './vehicle-make-details.component.css'
})
export class VehicleMakeDetailsComponent implements OnInit{
  constructor(private MakeService:VehicleMakeService){
    
  }
  filteredList!: IVehicleMake_[];
  searchQuery!: string ;
  vehiclesList!:IVehicleMake_[];
  ngOnInit() {
    

    this.MakeService.getVehicleMake().subscribe(res=> {
      this.vehiclesList=res;
      console.log(res);
      });
      
  }
  
  delete(id:number):void {
        if (confirm('Are you sure you want to delete this item?')){
          this.MakeService.deleteVehicleMake(id).subscribe(()=>{
              console.log('Item deleted successfully');
              this.ngOnInit();
            },
          );
        }
    }
    search(): void {
      if (this.searchQuery.trim() ==='') {
        this.filteredList = [...this.vehiclesList];
      } else 
      {
        this.filteredList = this.vehiclesList.filter(vehicle =>
          vehicle.Name.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
        );
      }
    }
  }
