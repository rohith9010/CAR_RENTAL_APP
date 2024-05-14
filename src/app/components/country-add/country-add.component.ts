import { ICountries } from './../../../Interfaces/ICountries';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryService } from '../../../Services/CountriesService/Country.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css']
})
export class CountryAddComponent implements OnInit {
  
  model:ICountries={CountryNo:0,Country:'',States:[{StateNo: 0, state: "", CountryNo: 0,Citys: []}]};

  constructor(private route : ActivatedRoute,private CountryService:CountryService,private router:Router)
  {

  }
  ngOnInit(): void {
    this.getbyid();
  }
  getbyid(){
    const idString = this.route.snapshot.params['id'];
    const id = Number(idString); 
    console.log(id);
    if (id) {
      this.CountryService.getCountryById(id).subscribe((data)=>{
        this.model=data;
        console.log(this.model       );
          })
    }
  }
update()
{
  this.CountryService.updateCountry(this.model).subscribe(data=>{console.log(data);
  this.router.navigate(['/country_details'])}); 
}

Save()
{
  this.CountryService.addCountry(this.model).subscribe(res=>{console.log(res)  
  this.router.navigate(['/country_details'])});
}

  Clear()
  {
    
  }
}
