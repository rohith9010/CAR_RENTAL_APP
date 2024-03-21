import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { VehicleMakeService } from '../../../Services/vehicle-make.service';
import { IVehicleMake_ } from '../../../Interfaces/IVehicleMake_';
import { Router } from 'express';

@Component({
  selector: 'app-vehicle-make-details',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './vehicle-make-details.component.html',
  styleUrl: './vehicle-make-details.component.css'
})
export class VehicleMakeDetailsComponent {
  constructor(private MakeService:VehicleMakeService){
    this.vehiclesList=this.MakeService.getVehicleMake();
  }
  vehiclesList:IVehicleMake_[]=[];

}
