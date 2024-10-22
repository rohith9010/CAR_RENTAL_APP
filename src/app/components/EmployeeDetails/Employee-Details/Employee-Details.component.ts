import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../Services/EmployeeService/employee.service';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IEmployee } from '../../../../Interfaces/IEmployee';
import { CommonModule } from '@angular/common';
import { FormsModule,  } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IEmployeetype } from '../../../../Interfaces/IEmployeetype';


@Component({
  selector: 'app-Employee-Details',
  standalone: true,
  imports: [CommonModule,MatIconModule,FormsModule,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './Employee-Details.component.html',
  styleUrls: ['./Employee-Details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(private employeeservice:EmployeeService,  private route:ActivatedRoute) { }

    filteredemployeeList!: IEmployee[];
    searchQuery!: string ;
    EmployeeList!:IEmployee[];
    currentPage: number = 1;
    itemsPerPage: number = 8;
    showClearIcon: boolean = false;
    employeetypelist!:IEmployeetype[];


    ngOnInit() {
      this.getemployee();
    }


    getemployee()
    {
      this.employeeservice.GetEmployee().subscribe((res: IEmployee[])=> {
        this.EmployeeList=res;
        this.search();
      });
    }
    

    search(): void 
    {
      const query = this.searchQuery?.trim().toLowerCase() || '';
    
      if (query === '') {
        this.filteredemployeeList = [...this.EmployeeList];
      } 
      else {
        this.filteredemployeeList = this.EmployeeList.filter(employee =>
          employee.EmployeeName.toLowerCase().includes(query)
        );
      }
      this.currentPage = 1;
    }


    delete(id:number):void 
    {
      if (confirm('Are you sure you want to delete this item?'))
      {
        this.employeeservice.DeleteEmployee(id).subscribe(()=>{
          console.log('Item deleted successfully');
          this.ngOnInit();
        });
      }
    }

    getDisplayedEmployee(): IEmployee[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return (this.filteredemployeeList || []).slice(startIndex, endIndex);
    }

    totalPages(): number[] {
      const totalItems = this.filteredemployeeList?.length ?? 0;
      const totalPages = Math.ceil(totalItems / this.itemsPerPage);
      return Array(totalPages).fill(0).map((x, i) => i + 1);
    }

    onPageChange(page: number): void {
      this.currentPage = page;
    }

    trackByFn(index: number, item: IEmployee): number {
      return item.EmployeeNo;
    }

}
