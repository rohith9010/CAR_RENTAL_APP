import { Component, model } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StateserviceService } from '../../../Services/StateService/stateservice.service';
import { ICountry } from '../../../Interfaces/ICountry';
import { CountryService } from '../../../Services/CountriesService/Country.service';
import { IState } from '../../../Interfaces/IState';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-state-details',
  standalone: true,
  imports: [CommonModule,MatIconModule,FormsModule,RouterLink],
  templateUrl: './state-details.component.html',
  styleUrl: './state-details.component.css'
})
export class StateDetailsComponent {
    filteredStateList! : IState[];
    searchQuery!: string;
    CountryList:ICountry[]=[];
    stateList: IState[]=[];
    currentPage: number = 1;
    itemsPerPage: number = 10;

    constructor(
      private StateService:StateserviceService,
      private CountryService:CountryService){}

    ngOnInit() {
      this.getAll();
    }
    getAll(){
      this.CountryService.getCountries().subscribe((res)=> {
        this.CountryList=res;
        this.search();
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

      if (!this.searchQuery) {
        this.filteredStateList = this.CountryList.flatMap(country => country.States);
        return;
      }
      else{
        const lowerSearchQuery = this.searchQuery.toLowerCase();
        this.filteredStateList = this.CountryList.flatMap(country =>
          country.States.filter(model => model.state.toLowerCase().includes(lowerSearchQuery))
        );
      }
      this.currentPage = 1;
    }

    onPageChange(page: number): void {
      this.currentPage = page;
    }

    getMakeName(countryno: number): string {
      const country = this.CountryList.find((v) => v.CountryNo === countryno);
      return country?.Country || '';
    }

    getDisplayedModels(): IState[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredStateList.slice(startIndex, endIndex);
    }

    getTotalPages(): number {
      return Math.ceil(this.filteredStateList.length / this.itemsPerPage);
    }

    totalPages(): number[] {
      const totalItems = this.filteredStateList.length;
      const totalPages = Math.ceil(totalItems / this.itemsPerPage);
      return Array(totalPages).fill(0).map((x, i) => i + 1);
    }
}
