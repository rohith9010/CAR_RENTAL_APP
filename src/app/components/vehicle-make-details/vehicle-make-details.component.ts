import { Component, OnInit} from '@angular/core';
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
  itemsPerPage: number = 8;
  showClearIcon: boolean = false;

  ngOnInit() {
    this.loadVehicleMake();
  }

  loadVehicleMake():void {

    this.MakeService.getVehicleMake().subscribe(res=> {
      this.vehiclesList=res;
      console.log(res);
      this.search();
    });
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
      const query = this.searchQuery?.trim().toLowerCase() || '';
  
      if (query === '') {
        this.filteredMakeList = [...this.vehiclesList];
      } else {
        this.filteredMakeList = this.vehiclesList.filter(make =>
          make.Name.toLowerCase().includes(query)
        );
      }
  
      this.currentPage = 1;
    }
  
    getDisplayedMakes(): IVehicleMake_[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return (this.filteredMakeList || []).slice(startIndex, endIndex);
    }
  
    onPageChange(page: number): void {
      this.currentPage = page;
    }
    totalPages(): number[] {
      const totalItems = this.filteredMakeList?.length ?? 0;
      const totalPages = Math.ceil(totalItems / this.itemsPerPage);
      return Array(totalPages).fill(0).map((x, i) => i + 1);
    }
  }
