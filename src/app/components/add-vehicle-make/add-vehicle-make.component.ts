import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleMakeService } from '../../../Services/vehicle-make.service';
import { IVehicleMake_ } from '../../../Interfaces/IVehicleMake_';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-vehicle-make',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './add-vehicle-make.component.html',
  styleUrl: './add-vehicle-make.component.css'
})
export class AddVehicleMakeComponent {

  constructor(private MakeService:VehicleMakeService,private router:Router)
  {

  }
  model:IVehicleMake_={MakeNo:0,Name:""}
  Save()
  {
    this.MakeService.AddVehicleMake(this.model);
    this.model.Name="";
    this.router.navigate(['/vehicle_make_details']);
    
  }

  Clear()
  {
    
  }
}
