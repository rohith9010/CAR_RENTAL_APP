import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ICity } from '../../../../Interfaces/ICity';
import { CitiesService } from '../../../../Services/CityService/Cities.service';
import { IState } from '../../../../Interfaces/IState';
import { StateserviceService } from '../../../../Services/StateService/stateservice.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';


@Component({
  selector: 'app-add-City',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatIconModule,CommonModule,InputTextModule,FloatLabelModule],
  templateUrl: './add-City.component.html',
  styleUrls: ['./add-City.component.css']
})
export class AddCityComponent implements OnInit {

  state:IState={StateNo:0,state:"",Citys:[],CountryNo:0};
  city:ICity={CityNo:0,CityName:"",StateNo:0}
  CitiesList!:ICity[];
  statesList:IState[] = [];
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
        this.state=data;
      })
    }
  }
  getbycityid(){
    const cityid = this.route.snapshot.params['Cityid'];
    if (cityid){
      this.CityService.getCitiesById(cityid).subscribe((data)=>{
        this.city=data;
      })
    }
  }
  getAllstates(){
   
    this.stateservice.GetAllStates().subscribe((res:IState[])=> {
      this.statesList=res;
      });
  }
update()
{
  this.state.Citys.forEach((City: ICity) => {
    if(City.CityNo==this.city.CityNo){
      City.CityName=this.city.CityName;
    }
  });
  this.CityService.updateCities(this.city).subscribe(data=>{
    this.router.navigate(['/city_details'])});
}
Save()
{
  this.statesList.forEach((val:IState)=>{
    if(val.state==this.state.state){
      this.city.StateNo=val.StateNo
    }
  })
  this.CityService.AddCities(this.city).subscribe(res=>{console.log(res)  
    this.router.navigate(['/city_details'])});
  }

}
