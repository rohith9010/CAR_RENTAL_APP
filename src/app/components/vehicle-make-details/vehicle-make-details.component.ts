import { Component, OnInit } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { VehicleMakeService } from '../../../Services/vehicle-make.service';
import { IVehicleMake_ } from '../../../Interfaces/IVehicleMake_';
import { Router } from 'express';

@Component({
  selector: 'app-vehicle-make-details',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, MatIconModule],
  templateUrl: './vehicle-make-details.component.html',
  styleUrl: './vehicle-make-details.component.css'
})
export class VehicleMakeDetailsComponent implements OnInit{
  constructor(private MakeService:VehicleMakeService){
    
  }
  vehiclesList:any;
  ngOnInit() {
    

    this.MakeService.getVehicleMake().subscribe(res=> {
      this.vehiclesList=res;
      });
  }


  

}
