import { Component } from '@angular/core';
import { IVehicleModel } from '../../../Interfaces/IVehicleModel';
import {MatIconModule } from '@angular/material/icon';
import { IVehicleMake_ } from '../../../Interfaces/IVehicleMake_';
import { VehicleMakeService } from '../../../Services/VehicleMakeservice/vehicle-make.service';
import { VehicleModelServiceService } from '../../../Services/VehicleModelservice/vehicle-model-service.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StateserviceService } from '../../../Services/StateService/stateservice.service';
import { IState } from '../../../Interfaces/IState';
import { ICountry } from '../../../Interfaces/ICountry';

@Component({
  selector: 'app-state-details',
  standalone: true,
  imports: [MatIconModule,FormsModule,RouterLink],
  templateUrl: './state-details.component.html',
  styleUrl: './state-details.component.css'
})
export class StateDetailsComponent {

  searchQuery!: string;
  CountryList:ICountry[]=[];

  constructor(private StateService:StateserviceService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll(){
    this.StateService.GetAllCountry().subscribe((res)=> {
      this.CountryList=res;
    });
  }

  delete(id:number):void {
    if (confirm('Are you sure you want to delete this item?')){
      this.StateService.DeleteState(id).subscribe(()=>{
          console.log('Item deleted successfully');
          this.ngOnInit();
        },
      );
    }
}
// search(): void {
//   if (this.searchQuery.trim() ==='') {
//     this.filteredList = [...this.vehicleList];
//   } else 
//   {
//     this.filteredList = this.vehicleList.filter(vehiclemodel =>
//       vehiclemodel.Name.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
//     );
//   }
// }

search(): void {
  // if (this.searchQuery.trim() === '') {
  //   this.filteredList = [...this.vehicleList];
  // } else {
  //   this.filteredList = this.vehicleList.filter(vehicle => {
  //     const modelName = vehicle.Vehiclemodels.find(model => model.Name.toLowerCase().includes(this.searchQuery.trim().toLowerCase()));
  //     const makeName = vehicle.Name.toLowerCase().includes(this.searchQuery.trim().toLowerCase());
  //     return modelName || makeName;
  //   });
  // }
}
}
