import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IVehicleModel } from '../../../Interfaces/IVehicleModel';
import { ActivatedRoute, Router } from '@angular/router';
import {MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { VehicleMakeService } from '../../../Services/VehicleMakeservice/vehicle-make.service';
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

  model:IVehicleMake_={MakeNo:0,Name:'',Vehiclemodels:[{ModelNo:0,Name:"",MakeNo:0}]};
  vehiclesList!:IVehicleMake_[];
  constructor(private route : ActivatedRoute,private router:Router,private MakeService:VehicleMakeService) { }

  ngOnInit() {
    this.getbyid();
    this.getAll();
  }
  getbyid(){
    // const id = this.route.snapshot.params['id'];
    // if (id) {
    //   this.ModelService.getModelById(id).subscribe(data=>{
    //     this.model=data;
    //     console.log(data);
    //   })
    // }
  }
  getAll(){
    this.MakeService.getVehicleMake().subscribe(res=> {
      this.vehiclesList=res;
      });
  }
update()
{
  // this.ModelService.updateVehicleModel(this.model).subscribe(data=>{console.log(data);
  // this.router.navigate(['/vehicle_model_details'])}); 
}
Save()
{
  console.log(this.model);
  // this.ModelService.AddVehicleModel(this.model).subscribe(res=>{console.log(res)  
  // this.router.navigate(['/vehicle_model_details'])});
  
}

}
