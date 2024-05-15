import { Component, model } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StateserviceService } from '../../../Services/StateService/stateservice.service';
import { ICountry } from '../../../Interfaces/ICountry';
import { CountryService } from '../../../Services/CountriesService/Country.service';
import { IState } from '../../../Interfaces/IState';

@Component({
  selector: 'app-state-details',
  standalone: true,
  imports: [MatIconModule,FormsModule,RouterLink],
  templateUrl: './state-details.component.html',
  styleUrl: './state-details.component.css'
})
export class StateDetailsComponent {
  filteredStateList! : IState[];
  searchQuery!: string;
  CountryList:ICountry[]=[];
  stateList: IState[]=[];

  constructor(private StateService:StateserviceService,private CountryService:CountryService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll(){
    this.CountryService.getCountries().subscribe((res)=> {
      this.CountryList=res;
    });
  }

  delete(id:number):void {
    if (confirm('Are you sure you want to delete this item?')){
      this.StateService.DeleteState(id).subscribe(()=>{
          console.log('Item deleted successfully');
          this.ngOnInit();
        },
      );
    }
}
search(): void {
  this.CountryList.forEach((model:ICountry)=>{
    if (this.searchQuery.trim() ==='') {
      this.filteredStateList = [...model.States];
    } else 
    {
      this.filteredStateList = model.States.filter(statemodel =>
        statemodel.state.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
      );
    }
  })
  
}
}
