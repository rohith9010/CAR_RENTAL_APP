import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleModelService } from '../../../Services/VehicleModelservice/Vehicle-Model.service';
import { IVehicleModel } from '../../../Interfaces/IVehicleModel';
import { ActivatedRoute, Router } from '@angular/router';
import {MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-vehicle-model',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatIconModule,CommonModule],
  templateUrl: './add-vehicle-model.component.html',
  styleUrls: ['./add-vehicle-model.component.css']
})
export class AddVehicleModelComponent implements OnInit {

  model:IVehicleModel={modelno: 0, name: "",makeno: 0};

  constructor(private route : ActivatedRoute,private ModelService:VehicleModelService,private router:Router) { }

  ngOnInit() {
    this.getbyid();
  }
  getbyid(){
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.ModelService.getModelById(id).subscribe(data=>{
        this.model=data;
        console.log(data);
      })
    }
  }
update()
{
  this.ModelService.updateVehicleModel(this.model).subscribe(data=>{console.log(data);
  this.router.navigate(['/vehicle_model_details'])}); 
}
Save()
{
  this.ModelService.AddVehicleModel(this.model).subscribe(res=>{console.log(res)  
  this.router.navigate(['/vehicle_model_details'])});
}

}
