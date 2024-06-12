import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-Menu',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,MatToolbarModule,MatButtonModule,MatCardModule,MatIconModule,MatSidenavModule,MatListModule,MatExpansionModule,MatDialogModule],
  templateUrl: './Menu.component.html',
  styleUrls: ['./Menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild('notificationDialog') notificationDialog!: TemplateRef<any>;
  @ViewChild('helpDialog') helpDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog){}
  ngOnInit() {}
  sideNavOpened: boolean = false;

  toggleSideNav() {
    this.sideNavOpened = !this.sideNavOpened;
  }

  settingsClicked() {
    console.log('Settings clicked');
  }

  notificationsClicked() {
  this.dialog.open(this.notificationDialog,{
    width: '400px',
    height: '300px',
  });
  }

  helpClicked() {
    this.dialog.open(this.helpDialog, {
      width: '400px',
      height: '300px'
    });
  }

  profileClicked() {
    console.log('Profile clicked');
  }
  

  menuItems = [
    {
      name: 'Vehicle Management',
      icon: 'directions_car',
      subItems: [
        { name: 'Vehicle Make Details', routerLink: '/vehicle_make_details' },
        { name: 'Vehicle Model Details', routerLink: '/vehicle_model_details' },
        { name: 'Vehicle Details', routerLink: '/Vehicle_Details' }
      ]
    },
    {
      name: 'Location Management',
      icon: 'location_on',
      subItems: [
        { name: 'Country Details', routerLink: '/country_details' },
        { name: 'State Details', routerLink: '/State_Detail' },
        { name: 'City Details', routerLink: '/city_details' }
      ]
    },
    {
      name: 'User Management',
      icon: 'people',
      subItems: [
        { name: 'Employee Details', routerLink: '/Employee_Details' },
        { name: 'Customer Details', routerLink: '/Customer_Details' },
      ]
    },
    {
      name: 'Driver Management',
      icon: 'directions_bus',
      subItems: [
        { name: 'Driver Details', routerLink: '/Driver_Details' },
      ]
    },
    {
      name: 'Owner Management',
      icon: 'business',
      subItems: [
        { name: 'Owner Details', routerLink: '/Owner_details' },
      ]
    },
    {
      name: 'Reservation Management',
      icon: 'event',
      subItems: [
        { name: 'Reservation Details', routerLink: '' },
        { name: 'View Reservation for Today', routerLink: '' },
        { name: 'View Reservation for Tomorrow', routerLink: '' },

      ]
    },
  ];
  
}
