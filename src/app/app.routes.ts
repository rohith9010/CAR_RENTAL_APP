import { CountryAddComponent } from './components/country-add/country-add.component';
import { Routes } from '@angular/router';
import { VehicleMakeDetailsComponent } from './components/vehicle-make-details/vehicle-make-details.component';
import { VehicleModelDetailsComponent } from './components/vehicle-model-details/vehicle-model-details.component';
import { AddVehicleMakeComponent } from './components/add-vehicle-make/add-vehicle-make.component';
import { AddVehicleModelComponent } from './components/add-vehicle-model/add-vehicle-model.component';
import { MenuComponent } from './components/Menu/Menu.component';
import { AddCityDetailsComponent } from './components/add-city-details/add-City-Details/add-City-Details.component';
import { AddCityComponent } from './components/add-city/add-City/add-City.component';
import { StateDetailsComponent } from './components/state-details/state-details.component';
import { AddStateComponent } from './components/add-state/add-state.component';
import { CountryDetailsComponent } from './components/CountryDetails/Country-Details/Country-Details.component';
import { OwnerDetailsComponent } from './components/Owner/Owner-Details/Owner-Details.component';
import { AddOwnerComponent } from './components/add-owner/Add-Owner/Add-Owner.component';
import { AddEmployeeComponent } from './components/add-employee/Add-Employee/Add-Employee.component';
import { EmployeeDetailsComponent } from './components/EmployeeDetails/Employee-Details/Employee-Details.component';
export const routes: Routes = [
    {path:'',component:MenuComponent,pathMatch:'full'},
    
    {path:'vehicle_make_details',component:VehicleMakeDetailsComponent},
    {path:'vehicle_model_details',component:VehicleModelDetailsComponent},
    {path:'city_details',component:AddCityDetailsComponent},
    {path:'country_details',component:CountryDetailsComponent},
    {path:'Owner_details',component:OwnerDetailsComponent},
    {path:'Employee_Details',component:EmployeeDetailsComponent},

    {path:'Menu',component:MenuComponent},


    {path:'Add_vehicle_Make/:id',component:AddVehicleMakeComponent},
    {path:'Add_City/:Stateid/:Cityid',component:AddCityComponent},
    {path:'Add_State/:CountryId/:StateId',component:AddStateComponent},
    {path:'Add_country/:id',component:CountryAddComponent},
    {path:'Add_owner/:Id',component:AddOwnerComponent},
    {path:'Add_vehicle_Model/:Makeid/:Modelid',component:AddVehicleModelComponent},

    {path:'Add_owner',component:AddOwnerComponent},
    {path:'Add_City',component:AddCityComponent},
    {path:'Add_vehicle_Model',component:AddVehicleModelComponent},
    {path:'Add_vehicle_Make',component:AddVehicleMakeComponent},
    {path:'Add_employee',component:AddEmployeeComponent},
    {path:'Add_country',component:CountryAddComponent},
    {path:'Add_vehicle_Model',component:AddVehicleModelComponent},
    {path:'Add_vehicle_Make',component:AddVehicleMakeComponent},
    {path:'State_Detail',component:StateDetailsComponent},
    {path:'Add_State',component:AddStateComponent}
];
