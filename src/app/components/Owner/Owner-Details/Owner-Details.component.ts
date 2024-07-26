import { Component, OnInit } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { OwnerServiceService } from '../../../../Services/OwnerService/owner-service.service';
import { IOwner } from '../../../../Interfaces/IOwner';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-Owner-Details',
  standalone: true,
  imports: [
    OwnerDetailsComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './Owner-Details.component.html',
  styleUrls: ['./Owner-Details.component.css']
})
export class OwnerDetailsComponent implements OnInit {

  constructor(private ownerservice:OwnerServiceService,private route : ActivatedRoute) { }

  filteredownerList!: IOwner[];
  searchQuery!: string ;
  ownerList!:IOwner[];

  currentPage: number = 1;
  itemsPerPage: number = 8;
  showClearIcon: boolean = false;

  ngOnInit() {
    this.getowner();
  }
  
  getowner()
  {
    this.ownerservice.GetOwner().subscribe((res: IOwner[])=> {
      this.ownerList=res;
      this.search();
    });
  }
  delete(id:number):void 
  {
    if (confirm('Are you sure you want to delete this item?'))
    {
      this.ownerservice.DeleteOwner(id).subscribe(()=>{
        console.log('Item deleted successfully');
        this.ngOnInit();
      });
    }
  }
  search(): void 
  {
    const query = this.searchQuery?.trim().toLowerCase() || '';
  
    if (query === '') {
      this.filteredownerList = [...this.ownerList];
    } 
    else {
      this.filteredownerList = this.ownerList.filter(owner =>
        owner.Name.toLowerCase().includes(query)
      );
    }
    this.currentPage = 1;
  }
   
    getDisplayedVehicles(): IOwner[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return (this.filteredownerList || []).slice(startIndex, endIndex);
    }
  
    totalPages(): number[] {
      const totalItems = this.filteredownerList?.length ?? 0;
      const totalPages = Math.ceil(totalItems / this.itemsPerPage);
      return Array(totalPages).fill(0).map((x, i) => i + 1);
    }
  
    onPageChange(page: number): void {
      this.currentPage = page;
    }
  
    trackByFn(index: number, item: IOwner): number {
      return item.OwnerNo;
    }

}
