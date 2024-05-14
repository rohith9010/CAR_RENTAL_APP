import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ICities } from '../../../../Interfaces/ICities';
import { CitiesService } from '../../../../Services/CityService/Cities.service';
import { IStates } from '../../../../Interfaces/IStates';


@Component({
  selector: 'app-add-City',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatIconModule,CommonModule],
  templateUrl: './add-City.component.html',
  styleUrls: ['./add-City.component.css']
})
export class AddCityComponent implements OnInit {

  model:IStates={StateNo:0,state:"",Citys:[],CountryNo:0};
  getcities:ICities={CityNo:0,CityName:"",StateNo:0}
  CitiesList!:ICities[];
  models:IStates[] = [];
  constructor(private route : ActivatedRoute,private router:Router,private CityService:CitiesService) { }

  ngOnInit() {
    this.getstatebyid();
    this.getbycityid();
    this.getAllstates();
  }
  getstatebyid(){
    const stateid = this.route.snapshot.params['Stateid'];
    if (stateid) {
      this.CityService.getstatesById(stateid).subscribe((data:IStates)=>{
        this.model=data;
      })
    }
  }
  getbycityid(){
    const cityid = this.route.snapshot.params['Cityid'];
    if (cityid){
      this.CityService.getCitiesById(cityid).subscribe((data)=>{
        this.getcities=data;
      })
    }
  }
  getAllstates(){
   
    this.CityService.getStates().subscribe((res:IStates[])=> {
      this.models=res;
      console.log(res);
      });
  }
update()
{
  this.model.Citys.forEach((City: ICities) => {
    if(City.CityNo==this.getcities.CityNo){
      City.CityName=this.getcities.CityName;
    }
  });
  this.CityService.updateCities(this.getcities).subscribe(data=>{
    this.router.navigate(['/city_details'])});
}
Save()
{
  this.models.forEach((val:IStates)=>{
    if(val.state==this.model.state){
      this.getcities.StateNo=val.StateNo
    }
  })
  this.CityService.AddCities(this.getcities).subscribe(res=>{console.log(res)  
    this.router.navigate(['/city_details'])});
  }

}
