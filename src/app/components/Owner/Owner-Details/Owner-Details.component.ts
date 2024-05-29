import { Component, OnInit } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { OwnerServiceService } from '../../../owner-service.service';
import { IOwner } from '../../../../Interfaces/IOwner';

@Component({
  selector: 'app-Owner-Details',
  standalone: true,
  imports: [
    OwnerDetailsComponent,RouterOutlet,RouterLink,RouterLinkActive, MatIconModule,FormsModule,ReactiveFormsModule
  ],
  templateUrl: './Owner-Details.component.html',
  styleUrls: ['./Owner-Details.component.css']
})
export class OwnerDetailsComponent implements OnInit {

  constructor(private ownerservice:OwnerServiceService,private route : ActivatedRoute) { }

  filteredownerList!: IOwner[];
  searchQuery!: string ;
  ownerList!:IOwner[];
  ngOnInit() {
    

    this.ownerservice.GetOwner().subscribe((res: IOwner[])=> {
      this.ownerList=res;
    });
      
  }
  
  delete(id:number):void {
        if (confirm('Are you sure you want to delete this item?')){
          this.ownerservice.DeleteOwner(id).subscribe(()=>{
              console.log('Item deleted successfully');
              this.ngOnInit();
            },
          );
        }
    }
  search(): void {
      if (this.searchQuery.trim() ==='') {
        this.filteredownerList = [...this.ownerList];
      } else 
      {
        this.filteredownerList = this.ownerList.filter(owner =>
          owner.Name.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
        );
      }
    }
   
  

}
