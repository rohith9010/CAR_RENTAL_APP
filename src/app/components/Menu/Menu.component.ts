import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet} from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { MegaMenuModule } from 'primeng/megamenu';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SharedModule } from 'primeng/api';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-Menu',
  standalone: true,
  imports: [RouterOutlet,RouterLink,MenuModule,MegaMenuModule,ScrollPanelModule,ToolbarModule,AvatarModule,SharedModule,CommonModule ],
  templateUrl: './Menu.component.html',
  styleUrls: ['./Menu.component.css']

})
export class MenuComponent implements OnInit {

  constructor(){}

     items:MegaMenuItem[]=[];
    

    ngOnInit() {
      this.items = [
        {
          label: 'Vehicle Management',
          icon: 'pi pi-car',
          items: [
            [
            { label: 'Vehicle Make Details', routerLink: '/vehicle_make_details' },
            { label: 'Vehicle Model Details', routerLink: '/vehicle_model_details' },
            { label: 'Vehicle Details', routerLink: '/vehicle_details' }
            ]
          ]
        },
        {
          label: 'Location Management',
          icon: 'pi pi-map-marker',
          items: [
          [
            { label: 'Country Details', routerLink: '/country_details' },
            { label: 'State Details', routerLink: '/State_Detail' },
            { label: 'City Details', routerLink: '/city_details' }
          ]
          ]
        },
        {
          label: 'User Management',
          icon: 'pi pi-users',
          items: [
            [
            { label: 'Employee Details', routerLink: '/employee_details' },
            { label: 'Customer Details', routerLink: '/customer_details' }
            ]
          ]
        },
        {
          label: 'Driver Management',
          icon: 'pi pi-id-card',
          items: [
            [
            { label: 'Driver Details', routerLink: '/driver_details' }
            ]
          ]
        },
        {
          label: 'Reservation Management',
          icon: 'pi pi-calendar',
          items: [
            [
            { label: 'Reservation Details', routerLink: '/reservation_details' },
            { label: 'View Reservation for Today', routerLink: '/view_reservation_today' },
            { label: 'View Reservation for Tomorrow', routerLink: '/view_reservation_tomorrow' }
            ]
          ]
        },
        {
          label: 'Owner Management',
          icon: 'pi pi-user',
          items: [
            [
            { label: 'Owner Details', routerLink: '/owner_details' },
            { label: 'Add Owner', routerLink: '/add_owner' }
            ]
          ]
        }
      ];
    //   this.items = [
    //       {
    //           label: 'Vehicle Management',
    //           icon: 'pi pi-car',
    //           items: [
    //               [
    //                   {
    //                       label: 'Vehicle Make & Model',
    //                       items: [{ label: 'Vehicle Make Details',routerLink:'/vehicle_make_details' }, { label: 'Vehicle Model Details',routerLink:'/vehicle_model_details' }, { label: 'Vehicle Details',routerLink:'' }]
    //                   }
    //               ]
    //           ]
    //         },
    //       {
    //           label: 'Location Management',
    //           icon: 'pi pi-map-marker',
    //           items: [
    //                     [
    //                       {
    //                         label: 'Location',
    //                         items: [{ label: 'Country Details',routerLink:'/country_details' }, { label: 'State Details',routerLink:'/State_Detail' }, { label: 'City Details',routerLink:'/city_details' }]
    //                       }
    //                     ],
    //                  ]
    //       },
    //       {
    //           label: 'User Management',
    //           icon: 'pi pi-users',
    //           items: [
    //                     [
    //                       {
    //                         label: 'Users',
    //                         items: [{ label: 'Employee Details',routerLink:'' }, { label: 'Customer Details',routerLink:'' }]
    //                       }
    //                     ]
    //                  ]
    //       },
    //       {
    //         label: 'Driver Management',
    //         icon: 'pi pi-id-card',
    //         items: [
    //                   [
    //                     {
    //                       label: 'Driver',
    //                       items: [{ label: 'Driver Details',routerLink:'' }]
    //                     }
    //                   ]
    //                ]
    //     },
    //     {
    //       label: 'Reservation Management',
    //       icon: 'pi pi-calendar',
    //       items: [
    //                 [
    //                   {
    //                     label: 'Reservation',
    //                     items: [{ label: 'Reservation Details',routerLink:'' }, { label: 'View Reservation for Today',routerLink:'' },{ label: 'View Reservation for Tomorrow',routerLink:'' }]
    //                   }
    //                 ]
    //              ]
    //   },
    //   {
    //     label: 'Owner Management',
    //     icon: 'pi pi-user',
    //     items: [
    //               [
    //                 {
    //                   label: 'Owner',
    //                   items: [{ label: 'Owner Details',routerLink:'Owner_details'},{ label: 'Add Owner',routerLink:'Add_owner' }]
    //                 }
    //               ]
    //            ]
    // },

    //   ]
  }
  
}
