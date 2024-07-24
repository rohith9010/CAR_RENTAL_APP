import { Component, OnInit } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import {RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IVehicleModel } from '../../../Interfaces/IVehicleModel';
import { VehicleMakeService } from '../../../Services/VehicleMakeservice/vehicle-make.service';
import { IVehicleMake_ } from '../../../Interfaces/IVehicleMake_';
import { VehicleModelServiceService } from '../../../Services/VehicleModelservice/vehicle-model-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-vehicle-model-details',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,RouterLinkActive, MatIconModule,FormsModule,ReactiveFormsModule],
  templateUrl: './vehicle-model-details.component.html',
  styleUrls: ['./vehicle-model-details.component.css']
})
export class VehicleModelDetailsComponent implements OnInit {

  filteredModelList: IVehicleModel[]=[];
  searchQuery!: string;
  vehicleList:IVehicleMake_[]=[];
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(private MakeService:VehicleMakeService,private modelservice : VehicleModelServiceService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll(){
    this.MakeService.getVehicleMake().subscribe((res)=> {
      this.vehicleList=res;
      this.search();
    });
  }

  delete(id:number):void {
    if (confirm('Are you sure you want to delete this item?')){
      this.modelservice.deleteVehicleModel(id).subscribe(()=>{
          console.log('Item deleted successfully');
          this.getAll();
        },
      );
    }
  }

  search(): void {
    if (!this.searchQuery) {
      this.filteredModelList = this.vehicleList.flatMap(vehicle => vehicle.Vehiclemodels);
      return;
    }
    else{
      const lowerSearchQuery = this.searchQuery.toLowerCase();
      this.filteredModelList = this.vehicleList.flatMap(vehicle =>
      vehicle.Vehiclemodels.filter(model => model.Name.toLowerCase().includes(lowerSearchQuery))
      );
    }
    this.currentPage = 1;
  }

  getMakeName(makeNo: number): string {
    const vehicle = this.vehicleList.find((v) => v.MakeNo === makeNo);
    return vehicle?.Name || '';
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getDisplayedModels(): IVehicleModel[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredModelList.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredModelList.length / this.itemsPerPage);
  }

  totalPages(): number[] {
    const totalItems = this.filteredModelList.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }
}

