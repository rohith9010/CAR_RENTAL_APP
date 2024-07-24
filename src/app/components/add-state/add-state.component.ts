import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateserviceService } from '../../../Services/StateService/stateservice.service';
import { IState } from '../../../Interfaces/IState';
import { ICountry } from '../../../Interfaces/ICountry';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../../Services/CountriesService/Country.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-add-state',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatIconModule,CommonModule,InputTextModule,FloatLabelModule],
  templateUrl: './add-state.component.html',
  styleUrl: './add-state.component.css'
})
export class AddStateComponent {
  Country:ICountry={CountryNo:0,Country:"",States:[]};
  State:IState={StateNo:0,state:"",CountryNo:0,Citys:[]}
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
        this.State=data ;
      })
    }
  }
  getbymakeid(){
    const id = this.route.snapshot.params['CountryId'];
    if (id){
      this.CountryService.getCountryById(id).subscribe((data)=>{
        this.Country=data;
      });
    }
  }
  getAll(){
   
    this.CountryService.getCountries().subscribe(res=> {
      this.CountryList=res;
      });
  }
  update()
  {
    this.Country.States.forEach((State: IState) => {
      if(State.StateNo==this.State.StateNo){
        State.state=this.State.state;
      }
    });
    this.StateService.UpdateState(this.State).subscribe(data=>{
      this.router.navigate(['/State_Detail'])}); 
  }
  Save()
  {
    this.CountryList.forEach((val:ICountry)=>{
      if(val.Country==this.Country.Country){
        this.State.CountryNo=val.CountryNo;
      }
    })
    this.StateService.AddState(this.State).subscribe(res=>{console.log(res)  
      this.router.navigate(['/State_Detail'])});
  }
}
