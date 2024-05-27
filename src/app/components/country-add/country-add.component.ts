import { ICountry } from '../../../Interfaces/ICountry';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryService } from '../../../Services/CountriesService/Country.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-country-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatIconModule, CommonModule,InputTextModule,FloatLabelModule],
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css']
})
export class CountryAddComponent implements OnInit {
  inputValue: string = '';
  
  country:ICountry={CountryNo:0,Country:'',States:[{StateNo: 0, state: "", CountryNo: 0,Citys: []}]};

  constructor(private route : ActivatedRoute,private CountryService:CountryService,private router:Router)
  {

  }
  ngOnInit(): void {
    this.getbyid();
  }
  getbyid(){
    const idString = this.route.snapshot.params['id'];
    const id = Number(idString); 
    
    if (id) {
      this.CountryService.getCountryById(id).subscribe((data)=>{
        this.country=data;
          })
    }
  }
update()
{
  this.CountryService.updateCountry(this.country).subscribe(data=>{console.log(data);
  this.router.navigate(['/country_details'])}); 
}

Save()
{
  this.CountryService.addCountry(this.country).subscribe(res=>{console.log(res)  
  this.router.navigate(['/country_details'])});
}

clearInput() {
  this.inputValue = '';
}
}
