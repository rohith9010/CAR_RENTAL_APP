import { Component, OnInit } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CountryService } from '../../../../Services/CountriesService/Country.service';
import { ICountry } from '../../../../Interfaces/ICountry';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Country-Details',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, MatIconModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './Country-Details.component.html',
  styleUrls: ['./Country-Details.component.css']
})
export class CountryDetailsComponent implements OnInit {

  constructor(private countryservice: CountryService) { }

  countriesList: ICountry[] = [];
  filteredcountriesList: ICountry[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 8;
  showClearIcon: boolean = false;

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryservice.getCountries().subscribe(res => {
      this.countriesList = res;
      this.filteredcountriesList = this.countriesList;
      this.search();
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  totalPages(): number[] {
    const totalItems = this.filteredcountriesList?.length ?? 0;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  getDisplayedMakes(): ICountry[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return (this.filteredcountriesList || []).slice(startIndex, endIndex);
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.countryservice.deleteCountry(id).subscribe(() => {
        console.log('Item deleted successfully');
        this.loadCountries();
      });
    }
  }

  search(): void {

    const query = this.searchQuery?.trim().toLowerCase() || '';
  
      if (query === '') {
        this.filteredcountriesList = [...this.countriesList];
      } 
      else {
        this.filteredcountriesList = this.countriesList.filter(country =>
          country.Country.toLowerCase().includes(query)
        );
      }
      this.currentPage = 1;
  }
}
