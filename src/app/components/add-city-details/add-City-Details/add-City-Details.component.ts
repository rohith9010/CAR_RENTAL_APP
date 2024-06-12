import { Component, OnInit } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import {RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ICity } from '../../../../Interfaces/ICity';
import { CitiesService } from '../../../../Services/CityService/Cities.service';
import { IState } from '../../../../Interfaces/IState';
import { StateserviceService } from '../../../../Services/StateService/stateservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-City-Details',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,RouterLinkActive, MatIconModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-City-Details.component.html',
  styleUrls: ['./add-City-Details.component.css']
})
export class AddCityDetailsComponent implements OnInit {

  filteredCityList: ICity[]=[];
  searchQuery!: string;
  stateList:IState[]=[];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private cityservice : CitiesService,private stateservice : StateserviceService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll(){
    this.stateservice.GetAllStates().subscribe((res)=> {
      this.stateList=res;
      this.search();
    });
  }

  delete(id:number):void {
    if (confirm('Are you sure you want to delete this item?')){
      this.cityservice.deleteCities(id).subscribe(()=>{
          console.log('Item deleted successfully');
          this.ngOnInit();
        },
      );
    }
}
  search(): void {
    if (!this.searchQuery) {
      this.filteredCityList = this.stateList.flatMap(state => state.Citys);
      return;
    }
    else{
      const lowerSearchQuery = this.searchQuery.toLowerCase();
      this.filteredCityList = this.stateList.flatMap(state =>
        state.Citys.filter(model => model.CityName.toLowerCase().includes(lowerSearchQuery))
      );
    }
    this.currentPage = 1;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getMakeName(stateno: number): string {
    const State = this.stateList.find((v) => v.StateNo === stateno);
    return State?.state || '';
  }

  getDisplayedModels(): ICity[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCityList.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredCityList.length / this.itemsPerPage);
  }

  totalPages(): number[] {
    const totalItems = this.filteredCityList.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

}
