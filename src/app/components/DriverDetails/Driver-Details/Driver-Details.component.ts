import { Component, OnInit } from '@angular/core';
import { IDriver } from '../../../../Interfaces/IDriver';
import { DriverService } from '../../../../Services/DriverService/Driver.service';
// import { ICountry } from '../../../../Interfaces/ICountry';
// import { CountryService } from '../../../../Services/CountriesService/Country.service';
// import { IState } from '../../../../Interfaces/IState';
// import { StateserviceService } from '../../../../Services/StateService/stateservice.service';
// import { ICity } from '../../../../Interfaces/ICity';
// import { CitiesService } from '../../../../Services/CityService/Cities.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-Driver-Details',
  standalone:true,
  imports:[
   FormsModule,
   RouterLink,
   ReactiveFormsModule, 
   RouterOutlet,
   RouterLinkActive,
  ],
  templateUrl: './Driver-Details.component.html',
  styleUrls: ['./Driver-Details.component.css']
})
export class DriverDetailsComponent implements OnInit {

  constructor(private Driverservice:DriverService,
    private router:ActivatedRoute
   ) { }

   filteredDriverList!: IDriver[];
  searchQuery!: string ;
  driverList!:IDriver[];

  ngOnInit() {
    this.GetDriver();
  }

  GetDriver()
  {
    this.Driverservice.GetDriver().subscribe((res:IDriver[])=>{
      this.driverList=res;
      console.log(res);
    })
  }
  search(): void {
    if (this.searchQuery.trim() ==='') {
      this.filteredDriverList = [...this.driverList];
    } else 
    {
      this.filteredDriverList = this.driverList.filter(driver =>
        driver.DriverName.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
      );
    }
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
}
