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

  model:IVehicleMake_={MakeNo:0,Name:"",Vehiclemodels:[{ModelNo:0,Name:"",MakeNo:0}]};
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
      this.isMake=true;
      this.MakeService.getById(id,this.isMake).subscribe((data:Response)=>{
        this.model=data as IVehicleMake_;
        this.isMake=false;
      })
     
    }
  }
  getAll(){
    this.MakeService.getVehicleMake().subscribe(res=> {
      this.vehiclesList=res;
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
  this.model.Vehiclemodels.push(this.getmodel);
  this.MakeService.AddVehicleMake(this.model).subscribe(res=>{console.log(res)  
  this.router.navigate(['/vehicle_model_details'])});
  
}

}
