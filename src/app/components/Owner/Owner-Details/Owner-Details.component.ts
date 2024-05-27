import { Component, OnInit } from '@angular/core';
import { ICountry } from '../../../../Interfaces/ICountry';
import {MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CountryService } from '../../../../Services/CountriesService/Country.service';
@Component({
  selector: 'app-Owner-Details',
  standalone: true,
  imports: [
    OwnerDetailsComponent,RouterOutlet,RouterLink,RouterLinkActive, MatIconModule,FormsModule,ReactiveFormsModule
  ],
  templateUrl: './Owner-Details.component.html',
  styleUrls: ['./Owner-Details.component.css']
})
export class OwnerDetailsComponent implements OnInit {

  constructor(private countryservice:CountryService) { }

  filteredcountriesList!: ICountry[];
  searchQuery!: string ;
  countriesList!:ICountry[];
  ngOnInit() {
    

    this.countryservice.getCountries().subscribe((res: ICountry[])=> {
      this.countriesList=res;
    });
      
  }
  
  delete(id:number):void {
        if (confirm('Are you sure you want to delete this item?')){
          this.countryservice.deleteCountry(id).subscribe(()=>{
              console.log('Item deleted successfully');
              this.ngOnInit();
            },
          );
        }
    }
  search(): void {
      if (this.searchQuery.trim() ==='') {
        this.filteredcountriesList = [...this.countriesList];
      } else 
      {
        this.filteredcountriesList = this.countriesList.filter(country =>
          country.Country.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
        );
      }
    }
}
