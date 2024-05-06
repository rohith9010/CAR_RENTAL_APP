import { Component, OnInit } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import {RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IVehicleModel } from '../../../Interfaces/IVehicleModel';
import { VehicleMakeService } from '../../../Services/VehicleMakeservice/vehicle-make.service';
import { IVehicleMake_ } from '../../../Interfaces/IVehicleMake_';

@Component({
  selector: 'app-vehicle-model-details',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, MatIconModule,FormsModule,ReactiveFormsModule],
  templateUrl: './vehicle-model-details.component.html',
  styleUrls: ['./vehicle-model-details.component.css']
})
export class VehicleModelDetailsComponent implements OnInit {

  filteredList!: IVehicleModel[];
  searchQuery!: string ;
  vechiclemodel:boolean=false;
  vehicleList!:IVehicleMake_[];
  constructor(private MakeService:VehicleMakeService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll(){
    this.vechiclemodel=true;
    this.MakeService.getVehicleMake(this.vechiclemodel).subscribe(res=> {
      this.vehicleList=res;
      this.vechiclemodel=false;
      });
  }

  delete(id:number):void {
    if (confirm('Are you sure you want to delete this item?')){
      this.MakeService.deleteVehicleMake(id,this.vechiclemodel).subscribe(()=>{
          console.log('Item deleted successfully');
          this.ngOnInit();
        },
      );
    }
}
search(): void {
  // if (this.searchQuery.trim() ==='') {
  //   this.filteredList = [...this.vehicleList];
  // } else 
  // {
  //   this.filteredList = this.vehicleList.filter(vehiclemodel =>
  //     vehiclemodel.Name.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
  //   );
  // }
}
currentPage: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  totalItems: number = 0; // Total number of items

// Calculate the index to start from based on current page and items per page
getStartIndex(): number {
  return (this.currentPage - 1) * this.itemsPerPage;
}

// Calculate the index to end at based on current page and items per page
getEndIndex(): number {
  return this.currentPage * this.itemsPerPage;
}

// Function to navigate to the next page
nextPage() {
  if (this.currentPage < this.totalPages()) {
    this.currentPage++;
  }
}

// Function to navigate to the previous page
prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

// Function to get the total number of pages
totalPages(): number {
  return Math.ceil(this.totalItems / this.itemsPerPage);
}
}

