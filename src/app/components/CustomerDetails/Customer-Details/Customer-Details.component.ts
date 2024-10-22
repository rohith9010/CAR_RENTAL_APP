import { Component, OnInit } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { customerservice } from '../../../../Services/CustomerService/Customer.service';
import { ICustomer } from '../../../../Interfaces/ICustomer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Customer-Details',
  standalone: true,
  imports: [
    CustomerDetailsComponent,RouterOutlet,RouterLink,RouterLinkActive, MatIconModule,FormsModule,ReactiveFormsModule,CommonModule
  ],
  templateUrl: './Customer-Details.component.html',
  styleUrls: ['./Customer-Details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  constructor(private customerservice: customerservice,private route : ActivatedRoute) { }

  filteredcustomerList!: ICustomer[];
  searchQuery!: string ;
  customerList!:ICustomer[];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  showClearIcon: boolean = false;

  ngOnInit() {
    this.getcustomer();
  }
  getcustomer()
  {
    this.customerservice.GetCustomer().subscribe((res: ICustomer[])=> {
      this.customerList=res;
      this.search();
    });
  }
  delete(id:number):void 
  {
    if (confirm('Are you sure you want to delete this item?'))
    {
      this.customerservice.DeleteCustomer(id).subscribe(()=>{
        console.log('Item deleted successfully');
        this.ngOnInit();
      });
    }
  }
  search(): void 
  {
    const query = this.searchQuery?.trim().toLowerCase() || '';
  
    if (query === '') {
      this.filteredcustomerList = [...this.customerList];
    } 
    else {
      this.filteredcustomerList = this.customerList.filter(customer =>
        customer.Name.toLowerCase().includes(query)
      );
    }
    this.currentPage = 1;
  }
   
    getDisplayedVehicles(): ICustomer[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return (this.filteredcustomerList || []).slice(startIndex, endIndex);
    }
  
    totalPages(): number[] {
      const totalItems = this.filteredcustomerList?.length ?? 0;
      const totalPages = Math.ceil(totalItems / this.itemsPerPage);
      return Array(totalPages).fill(0).map((x, i) => i + 1);
    }
  
    onPageChange(page: number): void {
      this.currentPage = page;
    }
  
    trackByFn(index: number, item: ICustomer): number {
      return item.CustomerNo;
    }

}

 
  


