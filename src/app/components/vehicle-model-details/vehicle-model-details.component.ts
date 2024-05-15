import { Component, OnInit } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import {RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IVehicleModel } from '../../../Interfaces/IVehicleModel';
import { VehicleMakeService } from '../../../Services/VehicleMakeservice/vehicle-make.service';
import { IVehicleMake_ } from '../../../Interfaces/IVehicleMake_';
import { VehicleModelServiceService } from '../../../Services/VehicleModelservice/vehicle-model-service.service';

@Component({
  selector: 'app-vehicle-model-details',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, MatIconModule,FormsModule,ReactiveFormsModule],
  templateUrl: './vehicle-model-details.component.html',
  styleUrls: ['./vehicle-model-details.component.css']
})
export class VehicleModelDetailsComponent implements OnInit {

  filteredModelList: IVehicleModel[]=[];
  searchQuery!: string;
  vehicleList:IVehicleMake_[]=[];
  constructor(private MakeService:VehicleMakeService,private modelservice : VehicleModelServiceService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll(){
    this.MakeService.getVehicleMake().subscribe((res)=> {
      this.vehicleList=res;
    });
  }

  delete(id:number):void {
    if (confirm('Are you sure you want to delete this item?')){
      this.modelservice.deleteVehicleModel(id).subscribe(()=>{
          console.log('Item deleted successfully');
          this.getAll();
        },
      );
    }
}
// search(): void {
//   if (this.searchQuery.trim() ==='') {
//     this.filteredModelList = [...this.vehicleList];
//   } else 
//   {
//     this.filteredModelList = this.vehicleList.filter(vehiclemodel =>
//       vehiclemodel.Name.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
//     );
//   }
// }

search(): void {
  // if (this.searchQuery.trim() === '') {
  //   this.filteredModelList = [...this.vehicleList];
  // } else {
  //   this.filteredModelList = this.vehicleList.filter(vehicle => {
  //     const modelName = vehicle.Vehiclemodels.find(model => model.Name.toLowerCase().includes(this.searchQuery.trim().toLowerCase()));
  //     const makeName = vehicle.Name.toLowerCase().includes(this.searchQuery.trim().toLowerCase());
  //     return modelName || makeName;
  //   });
  // }
}
}

