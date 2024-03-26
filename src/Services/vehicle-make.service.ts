import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVehicleMake_ } from '../Interfaces/IVehicleMake_';

@Injectable({
  providedIn: 'root'
})
export class VehicleMakeService {

  private apiUrl = '';
  vehiclesList:IVehicleMake_[]=[{Name:"umesh",MakeNo:0}];
  increment:number=1;
  constructor(private http: HttpClient) { }

  getVehicleMake()
  {
    return this.vehiclesList
  }
  AddVehicleMake(model:IVehicleMake_)
  {
    
    this.vehiclesList.push({Name:model.Name,MakeNo:this.increment})
    this.increment++;
  }

}
