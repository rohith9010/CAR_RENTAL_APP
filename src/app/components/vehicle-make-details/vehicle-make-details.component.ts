import { Component, OnInit, model } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { VehicleMakeService } from '../../../Services/VehicleMakeservice/vehicle-make.service';
import { IVehicleMake_ } from '../../../Interfaces/IVehicleMake_';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-vehicle-make-details',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, MatIconModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './vehicle-make-details.component.html',
  styleUrl: './vehicle-make-details.component.css'
})
export class VehicleMakeDetailsComponent implements OnInit{
  constructor(private MakeService:VehicleMakeService){
    
  }
  filteredMakeList!: IVehicleMake_[];
  searchQuery!: string ;
  vehiclesList!:IVehicleMake_[];
  currentPage: number = 1;
  pageSize: number = 8;
  showClearIcon: boolean = false;

  ngOnInit() {
    this.loadVehicleMake();
  }

  loadVehicleMake():void {

    this.MakeService.getVehicleMake().subscribe(res=> {
      this.vehiclesList=res;
    });
  }
  applyPagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredMakeList = this.vehiclesList.slice(startIndex, startIndex + this.pageSize);
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
    return Math.ceil(this.vehiclesList.length / this.pageSize);
  }
  
  delete(id:number):void {
        if (confirm('Are you sure you want to delete this item?')){
          this.MakeService.deleteVehicleMake(id).subscribe(()=>{
              console.log('Item deleted successfully');
              this.ngOnInit();
            },
          );
        }
    }
    search(): void {
      const query = this.searchQuery.trim().toLowerCase();
        this.filteredMakeList = this.vehiclesList.filter(make => 
          make.Name.toLowerCase().includes(query)
        );
        this.currentPage = 1;
        this.showClearIcon = this.searchQuery.length > 0;
    }
    clearSearch(): void {
      this.searchQuery = '';
      this.search();
    }
  }
