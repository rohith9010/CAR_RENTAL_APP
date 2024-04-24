import { Component, OnInit } from '@angular/core';
import { VehicleModelService } from '../../../Services/VehicleModelservice/Vehicle-Model.service';
import {MatIconModule } from '@angular/material/icon';
import {RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IVehicleModel } from '../../../Interfaces/IVehicleModel';

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
  vehiclesModelsList!:IVehicleModel[];
  constructor(private ModelService:VehicleModelService) { }

  ngOnInit() {
    this.ModelService.getVehicleModel().subscribe(x=>{
      this.vehiclesModelsList = x;
    });
  }

  delete(id:number):void {
    if (confirm('Are you sure you want to delete this item?')){
      this.ModelService.deleteVehicleModel(id).subscribe(()=>{
          console.log('Item deleted successfully');
          this.ngOnInit();
        },
      );
    }
}
search(): void {
  if (this.searchQuery.trim() ==='') {
    this.filteredList = [...this.vehiclesModelsList];
  } else 
  {
    this.filteredList = this.vehiclesModelsList.filter(vehicle =>
      vehicle.name.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
    );
  }
}

}
