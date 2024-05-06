import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IVehicleModel } from '../../../Interfaces/IVehicleModel';
import { ActivatedRoute, Router } from '@angular/router';
import {MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { VehicleMakeService ,Response } from '../../../Services/VehicleMakeservice/vehicle-make.service';
import { IPVersion } from 'net';
import { IVehicleMake_ } from '../../../Interfaces/IVehicleMake_';


@Component({
  selector: 'app-add-vehicle-model',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatIconModule,CommonModule],
  templateUrl: './add-vehicle-model.component.html',
  styleUrls: ['./add-vehicle-model.component.css']
})
export class AddVehicleModelComponent implements OnInit {

  model:IVehicleMake_={MakeNo:0,Name:"",Vehiclemodels:[]};
  getmodel:IVehicleModel={ModelNo:0,Name:"",MakeNo:0}
  vehiclesList!:IVehicleMake_[];
  isMake:boolean=false;
  constructor(private route : ActivatedRoute,private router:Router,private MakeService:VehicleMakeService) { }

  ngOnInit() {
    this.getbyid();
    this.getbymakeid();
    this.getAll();
  }
  getbyid(){
    const getmodelid = this.route.snapshot.params['name'];
    if (getmodelid) {
      this.MakeService.getById(getmodelid,this.isMake).subscribe((data:Response)=>{
        this.getmodel=data as IVehicleModel;
      })
    }
  }
  getbymakeid(){
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.MakeService.getById(id,this.isMake=true).subscribe((data:Response)=>{
        this.model=data as IVehicleMake_;
        console.log(this.model.Name);
        this.isMake=false;
      })
    }
  }
  getAll(){
   
    this.MakeService.getVehicleMake(this.isMake=true).subscribe(res=> {
      this.vehiclesList=res;
      console.log(res);
      this.isMake=false;
      });
  }
update()
{
  this.model.Vehiclemodels.forEach((vehicleModel: IVehicleModel) => {
    if(vehicleModel.ModelNo==this.getmodel.ModelNo){
      vehicleModel.Name=this.getmodel.Name;
    }
  });
  this.MakeService.updateVehicleMake(this.model,this.isMake).subscribe(data=>{
    this.router.navigate(['/vehicle_model_details'])}); 
}
Save()
{
  this.vehiclesList.forEach((mod:IVehicleMake_)=>{
    if(mod.Name==this.model.Name){
      this.model.MakeNo=mod.MakeNo;
    }
  })
  this.model.Vehiclemodels.push(this.getmodel);
  console.log(this.model);
  this.MakeService.AddVehicleMake(this.model,this.isMake=false).subscribe(res=>{console.log(res)  
  this.router.navigate(['/vehicle_model_details'])}); 
}

}
