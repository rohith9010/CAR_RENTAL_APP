import { Routes } from '@angular/router';
import { VehicleMakeDetailsComponent } from './components/vehicle-make-details/vehicle-make-details.component';
import { VehicleModelDetailsComponent } from './components/vehicle-model-details/vehicle-model-details.component';
import { AddVehicleMakeComponent } from './components/add-vehicle-make/add-vehicle-make.component';
import { AddVehicleModelComponent } from './components/add-vehicle-model/add-vehicle-model.component';
import { MenuComponent } from './components/Menu/Menu.component';
export const routes: Routes = [
    {path:'',component:MenuComponent,pathMatch:'full'},
    {path:'vehicle_make_details',component:VehicleMakeDetailsComponent},
    {path:'vehicle_model_details',component:VehicleModelDetailsComponent},
    {path:'Add_vehicle_Make/:id',component:AddVehicleMakeComponent},
    {path:'Add_vehicle_Model/:Makeid/:Modelid',component:AddVehicleModelComponent},

    {path:'Add_vehicle_Model',component:AddVehicleModelComponent},
    {path:'Add_vehicle_Make',component:AddVehicleMakeComponent}
    
];
