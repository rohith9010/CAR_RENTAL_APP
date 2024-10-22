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
import { CustomerDetailsComponent } from './components/CustomerDetails/Customer-Details/Customer-Details.component';
import { AddCustomerComponent } from './components/add-customer/Add-Customer/Add-Customer.component';
import { DriverDetailsComponent } from './components/DriverDetails/Driver-Details/Driver-Details.component';
import { AddDriverComponent } from './components/add-driver/Add-Driver/Add-Driver.component';
import { VehicleDetailsComponent } from './components/VehicleDetails/Vehicle-Details/Vehicle-Details.component';
import { AddVehicleComponent } from './components/add-vehicle/Add-Vehicle/Add-Vehicle.component';
// import { Add_ReservationComponent } from './components/add-reservation/Add_Reservation/Add_Reservation.component';
import { Reservation_DetailsComponent } from './components/ReservationDetails/Reservation_Details/Reservation_Details.component';
import { UserLoginPageComponent } from './components/User-login-page/user-login-page.component';
import { AdminloginComponent } from './components/Adminlogin/Adminlogin.component';
import { CustomerloginComponent } from './components/CustomerLogin/customerlogin/customerlogin.component';
import { authGuard } from '../Guards/auth.guard';

export const routes: Routes = [
    {path:'',component:UserLoginPageComponent,pathMatch:'full'},
    {path:'vehicle_make_details',component:VehicleMakeDetailsComponent,canActivate:[authGuard]},
    {path:'vehicle_model_details',component:VehicleModelDetailsComponent,canActivate:[authGuard]},
    {path:'city_details',component:AddCityDetailsComponent,canActivate:[authGuard]},
    {path:'country_details',component:CountryDetailsComponent,canActivate:[authGuard]},
    {path:'Owner_details',component:OwnerDetailsComponent,canActivate:[authGuard]},
    {path:'Employee_Details',component:EmployeeDetailsComponent,canActivate:[authGuard]},
    {path:'Customer_Details',component:CustomerDetailsComponent,canActivate:[authGuard]},
    {path:'Driver_Details',component:DriverDetailsComponent,canActivate:[authGuard]},
    {path:'Vehicle_Details',component:VehicleDetailsComponent,canActivate:[authGuard]},
    {path:'State_Detail',component:StateDetailsComponent,canActivate:[authGuard]},
    {path:'Reservation_Details',component:Reservation_DetailsComponent,canActivate:[authGuard]},
    {path:'AdminMenu',component:MenuComponent,canActivate:[authGuard]},
    {path: 'userhome', component: UserLoginPageComponent,canActivate:[authGuard] },
    {path: 'admin', component: AdminloginComponent,canActivate:[authGuard] },
    {path: 'userlogin', component: CustomerloginComponent },

    
    {path:'Add_vehicle_Make/:id',component:AddVehicleMakeComponent,canActivate:[authGuard]},
    {path:'Add_City/:Stateid/:Cityid',component:AddCityComponent,canActivate:[authGuard]},
    {path:'Add_State/:CountryId/:StateId',component:AddStateComponent,canActivate:[authGuard]},
    {path:'Add_country/:id',component:CountryAddComponent,canActivate:[authGuard]},
    {path:'Add_owner/:Id',component:AddOwnerComponent,canActivate:[authGuard]},
    {path:'Add_vehicle_Model/:Makeid/:Modelid',component:AddVehicleModelComponent},
    {path:'Add_Customer/:Id',component:AddCustomerComponent,canActivate:[authGuard]},
    // {path:'Add_Reservation/:id',component:Add_ReservationComponent},
    {path:'Add_Driver/:Id',component:AddDriverComponent,canActivate:[authGuard]},
    {path:'Add_Vehicle/:Id',component:AddVehicleComponent,canActivate:[authGuard]},
    {path:'Add_employee/:Id',component:AddEmployeeComponent,canActivate:[authGuard]},


    {path:'Add_owner',component:AddOwnerComponent,canActivate:[authGuard]},
    {path:'Add_City',component:AddCityComponent,canActivate:[authGuard]},
    {path:'Add_vehicle_Model',component:AddVehicleModelComponent,canActivate:[authGuard]},
    {path:'Add_vehicle_Make',component:AddVehicleMakeComponent,canActivate:[authGuard]},
    {path:'Add_employee',component:AddEmployeeComponent,canActivate:[authGuard]},
    {path:'Add_country',component:CountryAddComponent,canActivate:[authGuard]},
    {path:'Add_vehicle_Model',component:AddVehicleModelComponent,canActivate:[authGuard]},
    {path:'Add_vehicle_Make',component:AddVehicleMakeComponent,canActivate:[authGuard]},
    {path:'Add_State',component:AddStateComponent,canActivate:[authGuard]},
    {path:'Add_Customer',component:AddCustomerComponent,canActivate:[authGuard]},
    {path:'Add_Driver',component:AddDriverComponent,canActivate:[authGuard]},
    {path:'Add_Vehicle',component:AddVehicleComponent,canActivate:[authGuard]},
    // {path:'Add_Reservation',component:Add_ReservationComponent}
];