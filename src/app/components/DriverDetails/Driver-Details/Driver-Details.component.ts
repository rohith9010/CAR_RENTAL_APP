import { Component, OnInit } from '@angular/core';
import { IDriver } from '../../../../Interfaces/IDriver';
import { DriverService } from '../../../../Services/DriverService/Driver.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-Driver-Details',
  standalone:true,
  imports:[
   FormsModule,
   RouterLink,
   ReactiveFormsModule, 
   RouterOutlet,
   RouterLinkActive,
   CommonModule,
  ],
  templateUrl: './Driver-Details.component.html',
  styleUrls: ['./Driver-Details.component.css']
})
export class DriverDetailsComponent implements OnInit {

  constructor(
    private Driverservice:DriverService,
    private router:ActivatedRoute,
   ) { }

  filteredDriverList!: IDriver[];
  searchQuery!: string ;
  driverList!:IDriver[];

  currentPage: number = 1;
  itemsPerPage: number = 8;
  showClearIcon: boolean = false;

  ngOnInit() {
    this.GetDriver();
  }

  GetDriver()
  {
    this.Driverservice.GetDriver().subscribe((res:IDriver[])=>{
      this.driverList=res;
      console.log(res);
      this.search();
    })
  }
  
  delete(id:number):void {
    if (confirm('Are you sure you want to delete this item?')){
      this.Driverservice.DeleteDriver(id).subscribe(()=>{
          console.log('Item deleted successfully');
          this.ngOnInit();
        },
      );
    }
  }

  search(): void {

    const query = this.searchQuery?.trim().toLowerCase() || '';
  
    if (query === '') {
      this.filteredDriverList = [...this.driverList];
    } 
    else {
      this.filteredDriverList = this.driverList.filter(driver =>
        driver.DriverName.toLowerCase().includes(query)
      );
    }
    this.currentPage = 1;

  }
  getDisplayedVehicles(): IDriver[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return (this.filteredDriverList || []).slice(startIndex, endIndex);
  }

  totalPages(): number[] {
    const totalItems = this.filteredDriverList?.length ?? 0;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  trackByFn(index: number, item: IDriver): number {
    return item.DriverNo;
  }

}
