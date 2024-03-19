import { Routes } from '@angular/router';
import path from 'path';
import { VehicleMakeDetailsComponent } from './components/vehicle-make-details/vehicle-make-details.component';
import { AddVehicleMakeComponent } from './components/add-vehicle-make/add-vehicle-make.component';
import { MenuComponent } from './components/Menu/Menu.component';
export const routes: Routes = [
    {path:'',component:MenuComponent,pathMatch:'full'},
    {path:'vehicle_make_details',component:VehicleMakeDetailsComponent},
    {path:'Add_vehicle_Make',component:AddVehicleMakeComponent}
    
];
