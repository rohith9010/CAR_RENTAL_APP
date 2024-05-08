import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IVehicleModel } from '../../../Interfaces/IVehicleModel';
import { ActivatedRoute, Router } from '@angular/router';
import {MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { VehicleMakeService ,Response } from '../../../Services/VehicleMakeservice/vehicle-make.service';
import { IVehicleMake_ } from '../../../Interfaces/IVehicleMake_';
import { VehicleModelServiceService } from '../../../Services/VehicleModelservice/vehicle-model-service.service';


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
  vehiclesList!:IVehicleModel[];
  models:IVehicleMake_[] = [];
  constructor(private route : ActivatedRoute,private router:Router,private MakeService:VehicleMakeService,private ModelService:VehicleModelServiceService) { }

  ngOnInit() {
    this.getbyid();
    this.getbymakeid();
    this.getAll();
  }
  getbyid(){
    const getmodelid = this.route.snapshot.params['Makeid'];
    if (getmodelid) {
      this.MakeService.getById(getmodelid).subscribe((data:Response)=>{
        this.model=data as IVehicleMake_;
      })
    }
  }
  getbymakeid(){
    const id = this.route.snapshot.params['Modelid'];
    if (id){
      this.ModelService.getmodelById(id).subscribe((data)=>{
        this.getmodel=data;
      })
    }
  }
  getAll(){
   
    this.MakeService.getVehicleMake().subscribe((res:IVehicleMake_[])=> {
      this.models=res;
      console.log(res);
      });
  }
update()
{
  this.model.Vehiclemodels.forEach((vehicleModel: IVehicleModel) => {
    if(vehicleModel.ModelNo==this.getmodel.ModelNo){
      vehicleModel.Name=this.getmodel.Name;
    }
  });
  this.ModelService.updateVehicleModel(this.getmodel).subscribe(data=>{
    this.router.navigate(['/vehicle_model_details'])}); 
}
Save()
{
  this.ModelService.AddVehicleModel(this.getmodel).subscribe(res=>{console.log(res)  
    this.router.navigate(['/vehicle_make_details'])});
  }
}
