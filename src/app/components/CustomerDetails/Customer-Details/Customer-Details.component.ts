import { Component, OnInit } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { customerservice } from '../../../../Services/CustomerService/Customer.service';
import { ICustomer } from '../../../../Interfaces/ICustomer';

@Component({
  selector: 'app-Customer-Details',
  standalone: true,
  imports: [
    CustomerDetailsComponent,RouterOutlet,RouterLink,RouterLinkActive, MatIconModule,FormsModule,ReactiveFormsModule
  ],
  templateUrl: './Customer-Details.component.html',
  styleUrls: ['./Customer-Details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  constructor(private customerservice: customerservice,private route : ActivatedRoute) { }

  filteredcustomerList!: ICustomer[];
  searchQuery!: string ;
  customerList!:ICustomer[];
  ngOnInit() {
    

    this.customerservice.GetCustomer().subscribe((res: ICustomer[])=> {
      this.customerList=res;
    });
      
  }
  
  delete(id:number):void {
        if (confirm('Are you sure you want to delete this item?')){
          this.customerservice.DeleteCustomer(id).subscribe(()=>{
              console.log('Item deleted successfully');
              this.ngOnInit();
            },
          );
        }
    }
  search(): void {
      if (this.searchQuery.trim() ==='') {
        this.filteredcustomerList = [...this.customerList];
      } else 
      {
        this.filteredcustomerList = this.customerList.filter(customer =>
          customer.Name.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
        );
      }
    }
   
  

}
