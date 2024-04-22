import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleMakeService } from '../../../Services/vehicle-make.service';
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

  model:IVehicleMake_={MakeNo:0,Name:""};

  constructor(private route : ActivatedRoute,private MakeService:VehicleMakeService,private router:Router)
  {

  }
  ngOnInit(): void {
    this.getbyid();
  }
  getbyid(){
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.MakeService.getById(id).subscribe(data=>{
        this.model=data;
        console.log(data);
      })
    }
  }
update()
{
  this.MakeService.updateVehicleMake(this.model).subscribe(data=>{console.log(data);
  this.router.navigate(['/vehicle_make_details'])}); 
}
// delete(id:number):void {
//     if (confirm('Are you sure you want to delete this item?')) {
//       this.MakeService.deleteVehicleMake(id).subscribe(() => {
//           console.log('Item deleted successfully');
//           this.router.navigate(['/vehicle_make_details']);  
//         },
//       );
//     }
// }
Save()
{
  this.MakeService.AddVehicleMake(this.model).subscribe(res=>{console.log(res)  
  this.router.navigate(['/vehicle_make_details'])});
}

  Clear()
  {
    
  }
}

