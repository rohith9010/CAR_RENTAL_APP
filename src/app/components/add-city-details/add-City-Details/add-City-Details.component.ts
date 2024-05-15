import { Component, OnInit } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import {RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ICity } from '../../../../Interfaces/ICity';
import { CitiesService } from '../../../../Services/CityService/Cities.service';
import { IState } from '../../../../Interfaces/IState';
import { StateserviceService } from '../../../../Services/StateService/stateservice.service';


@Component({
  selector: 'app-add-City-Details',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, MatIconModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-City-Details.component.html',
  styleUrls: ['./add-City-Details.component.css']
})
export class AddCityDetailsComponent implements OnInit {

  filteredList: ICity[]=[];
  searchQuery!: string;
  stateList:IState[]=[];
  constructor(private cityservice : CitiesService,private stateservice : StateserviceService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll(){
    this.stateservice.GetAllStates().subscribe((res)=> {
      this.stateList=res;
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
//   if (this.searchQuery.trim() ==='') {
//     this.filteredList = [...this.vehicleList];
//   } else 
//   {
//     this.filteredList = this.vehicleList.filter(vehiclemodel =>
//       vehiclemodel.Name.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
//     );
//   }
 }

}
