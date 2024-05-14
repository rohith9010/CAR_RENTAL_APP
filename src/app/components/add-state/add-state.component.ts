import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateserviceService } from '../../../Services/StateService/stateservice.service';
import { IState } from '../../../Interfaces/IState';
import { ICountry } from '../../../Interfaces/ICountry';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Console } from 'console';
import { CountryService } from '../../../Services/CountriesService/Country.service';

@Component({
  selector: 'app-add-state',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatIconModule,CommonModule],
  templateUrl: './add-state.component.html',
  styleUrl: './add-state.component.css'
})
export class AddStateComponent {
  Country:ICountry={CountryNo:0,Country:"",States:[]};
  GetState:IState={StateNo:0,state:"",CountryNo:0,Citys:[]}
  StateList!:IState[];
  CountryList:ICountry[] = [];
  constructor(private route : ActivatedRoute,private router:Router,private StateService:StateserviceService,private CountryService:CountryService) { }

  ngOnInit() {
    this.getbyid();
    this.getbymakeid();
    this.getAll();
  }
  getbyid(){
    const getStateid = this.route.snapshot.params['StateId'];
    if (getStateid) {
      this.StateService.GetStatebyId(getStateid).subscribe(data=>{
        this.GetState=data ;
      })
    }
  }
  getbymakeid(){
    const id = this.route.snapshot.params['CountryId'];
    if (id){
      this.CountryService.getCountryById(id).subscribe((data)=>{
        this.Country=data;
      })
    }
  }
  getAll(){
   
    this.CountryService.getCountries().subscribe(res=> {
      this.CountryList=res;
      console.log(res);
      });
  }
update()
{
  this.Country.States.forEach((State: IState) => {
    if(State.StateNo==this.GetState.StateNo){
      State.state=this.GetState.state;
    }
  });
  this.StateService.UpdateState(this.GetState).subscribe(data=>{
    this.router.navigate(['/State_Detail'])}); 
}
Save()
{
  this.CountryList.forEach((val:ICountry)=>{
    if(val.Country==this.Country.Country){
      this.GetState.CountryNo=val.CountryNo;
    }
  })
  console.log(this.GetState);
  this.StateService.AddState(this.GetState).subscribe(res=>{console.log(res)  
    this.router.navigate(['/State_Detail'])});
  }
}
