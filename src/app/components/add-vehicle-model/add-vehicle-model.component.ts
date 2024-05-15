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

  vehiclemake:IVehicleMake_={MakeNo:0,Name:"",Vehiclemodels:[]};
  vehiclemodel:IVehicleModel={ModelNo:0,Name:"",MakeNo:0}
  vehiclesModelList!:IVehicleModel[];
  vehicleMakeList:IVehicleMake_[] = [];
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
        this.vehiclemake=data as IVehicleMake_;
      })
    }
  }
  getbymakeid(){
    const id = this.route.snapshot.params['Modelid'];
    if (id){
      this.ModelService.getmodelById(id).subscribe((data)=>{
        this.vehiclemodel=data;
      })
    }
  }
  getAll(){
   
    this.MakeService.getVehicleMake().subscribe((res:IVehicleMake_[])=> {
      this.vehicleMakeList=res;
      console.log(res);
      });
  }
update()
{
  this.vehiclemake.Vehiclemodels.forEach((vehicleModel: IVehicleModel) => {
    if(vehicleModel.ModelNo==this.vehiclemodel.ModelNo){
      vehicleModel.Name=this.vehiclemodel.Name;
    }
  });
  this.ModelService.updateVehicleModel(this.vehiclemodel).subscribe(data=>{
    this.router.navigate(['/vehicle_model_details'])}); 
}
Save()
{
  this.vehicleMakeList.forEach((val:IVehicleMake_)=>{
    if(val.Name==this.vehiclemake.Name){
      this.vehiclemodel.MakeNo=val.MakeNo
    }
  })
  this.ModelService.AddVehicleModel(this.vehiclemodel).subscribe(res=>{console.log(res)  
    this.router.navigate(['/vehicle_model_details'])});
  }
}
