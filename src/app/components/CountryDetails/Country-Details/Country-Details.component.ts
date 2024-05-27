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
  pageSize: number = 8;
  showClearIcon: boolean = false;

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryservice.getCountries().subscribe(res => {
      this.countriesList = res;
      this.filteredcountriesList = this.countriesList;
    });
  }

  applyPagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredcountriesList = this.countriesList.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.applyPagination();
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyPagination();
    }
  }

  onNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.applyPagination();
    }
  }

  getPages(): number[] {
    const totalPages = this.getTotalPages();
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  getTotalPages(): number {
    return Math.ceil(this.countriesList.length / this.pageSize);
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
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredcountriesList = this.countriesList.filter(country =>
      country.Country.toLowerCase().includes(query)
    );
    this.currentPage = 1;
    this.showClearIcon = this.searchQuery.length > 0;
  }
  clearSearch(): void {
    this.searchQuery = '';
    this.search();
  }
}
