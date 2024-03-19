import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVehicleMake_ } from '../Interfaces/IVehicleMake_';

@Injectable({
  providedIn: 'root'
})
export class VehicleMakeService {

  private apiUrl = '';

  constructor(private http: HttpClient) { }

  getVehicleMake()
  {

  }
  AddVehicleMake(model:IVehicleMake_)
  {
    console.log(model.Name);
  }


}
