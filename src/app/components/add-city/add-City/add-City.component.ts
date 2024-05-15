import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ICity } from '../../../../Interfaces/ICity';
import { CitiesService } from '../../../../Services/CityService/Cities.service';
import { IState } from '../../../../Interfaces/IState';
import { StateserviceService } from '../../../../Services/StateService/stateservice.service';


@Component({
  selector: 'app-add-City',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatIconModule,CommonModule],
  templateUrl: './add-City.component.html',
  styleUrls: ['./add-City.component.css']
})
export class AddCityComponent implements OnInit {

  model:IState={StateNo:0,state:"",Citys:[],CountryNo:0};
  getcities:ICity={CityNo:0,CityName:"",StateNo:0}
  CitiesList!:ICity[];
  models:IState[] = [];
  constructor(private route : ActivatedRoute,private router:Router,private CityService:CitiesService,private stateservice : StateserviceService) { }

  ngOnInit() {
    this.getstatebyid();
    this.getbycityid();
    this.getAllstates();
  }
  getstatebyid(){
    const stateid = this.route.snapshot.params['Stateid'];
    if (stateid) {
      this.stateservice.GetStatebyId(stateid).subscribe((data:IState)=>{
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
   
    this.stateservice.GetAllStates().subscribe((res:IState[])=> {
      this.models=res;
      console.log(res);
      });
  }
update()
{
  this.model.Citys.forEach((City: ICity) => {
    if(City.CityNo==this.getcities.CityNo){
      City.CityName=this.getcities.CityName;
    }
  });
  this.CityService.updateCities(this.getcities).subscribe(data=>{
    this.router.navigate(['/city_details'])});
}
Save()
{
  this.models.forEach((val:IState)=>{
    if(val.state==this.model.state){
      this.getcities.StateNo=val.StateNo
    }
  })
  this.CityService.AddCities(this.getcities).subscribe(res=>{console.log(res)  
    this.router.navigate(['/city_details'])});
  }

}
