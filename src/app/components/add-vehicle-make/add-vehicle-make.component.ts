import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleMakeService,Response } from '../../../Services/VehicleMakeservice/vehicle-make.service';
import { IVehicleMake_ } from '../../../Interfaces/IVehicleMake_';
import { ActivatedRoute, Router } from '@angular/router';
import {MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-vehicle-make',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatIconModule,CommonModule],
  templateUrl: './add-vehicle-make.component.html',
  styleUrl: './add-vehicle-make.component.css'
})
export class AddVehicleMakeComponent implements OnInit{

  model:IVehicleMake_={MakeNo:0,Name:'',Vehiclemodels:[{ModelNo:0,Name:"",MakeNo:0}]};
  constructor(private route : ActivatedRoute,private MakeService:VehicleMakeService,private router:Router)
  {

  }
  ngOnInit(): void {
    this.getbyid();
  }
  getbyid(){
    const idString = this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params);
 
    console.log(idString);
    const id = Number(idString); 
    console.log(id);
    if (id) {
      this.MakeService.getById(id).subscribe((data:Response)=>{
        this.model=data as IVehicleMake_;
        console.log(data);
      })
    }
  }
update()
{
  this.MakeService.updateVehicleMake(this.model).subscribe(data=>{console.log(data);
  this.router.navigate(['/vehicle_make_details'])}); 
}

Save()
{
  this.MakeService.AddVehicleMake(this.model).subscribe(res=>{console.log(res)  
  this.router.navigate(['/vehicle_make_details'])});
}

  Clear()
  {
    
  }
}

