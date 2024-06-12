import { Component, OnInit, } from '@angular/core';
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
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-Menu',
  standalone: true,
  imports: [MatMenuModule,RouterOutlet,CommonModule,RouterLink,MatToolbarModule,MatButtonModule,MatCardModule,MatIconModule,MatSidenavModule,MatListModule,MatExpansionModule,MatDialogModule],
  templateUrl: './Menu.component.html',
  styleUrls: ['./Menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private dialog: MatDialog){}
  ngOnInit() {}
  sideNavOpened: boolean = false;

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
        { name: 'Reservation Details', routerLink: '/Reservation_Details' },
        { name: 'View Reservation for Today', routerLink: '' },
        { name: 'View Reservation for Tomorrow', routerLink: '' },
        { name: 'View Reservation for Next 7 Days', routerLink: '' },
        { name: 'View Reservation for This Month', routerLink: '' },
        { name: 'View Reservation for Next Month', routerLink: '' },


      ]
    },
  ];

  toggleSideNav() {
    this.sideNavOpened = !this.sideNavOpened;
  }

  openAutomaticReplies() {
    console.log('Automatic Replies clicked');
  }

  openDisplaySettings() {
    console.log('Display Settings clicked');
  }

  openOfflineSettings() {
    console.log('Offline Settings clicked');
  }

  openManageAddIns() {
    console.log('Manage Add-ins clicked');
  }

  markAllAsRead() {
    console.log('Mark all as read clicked');
  }

  viewAllNotifications() {
    console.log('View all notifications clicked');
  }

  notificationSettings() {
    console.log('Notification settings clicked');
  }

  notificationsClicked() {
    console.log('Notifications clicked');
  }

  helpClicked() {
    console.log('Help clicked');
  }

  profileClicked() {
    console.log('Profile clicked');
  }

  openMyProfile() {
    console.log('My Profile clicked');
  }

  openMyAccount() {
    console.log('My Account clicked');
  }

  signOut() {
    console.log('Sign Out clicked');
  }

  
}
