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
    {path:'vehicle_model_details',component:VehicleModelDetailsComponent},
    {path:'city_details',component:AddCityDetailsComponent},
    {path:'country_details',component:CountryDetailsComponent},
    {path:'Owner_details',component:OwnerDetailsComponent},
    {path:'Employee_Details',component:EmployeeDetailsComponent},
    {path:'Customer_Details',component:CustomerDetailsComponent},
    {path:'Driver_Details',component:DriverDetailsComponent},
    {path:'Vehicle_Details',component:VehicleDetailsComponent},
    {path:'State_Detail',component:StateDetailsComponent},
    {path:'Reservation_Details',component:Reservation_DetailsComponent},
    {path:'AdminMenu',component:MenuComponent},
    {path: 'userhome', component: UserLoginPageComponent },
    {path: 'admin', component: AdminloginComponent },
    {path: 'userlogin', component: CustomerloginComponent },

    
    {path:'Add_vehicle_Make/:id',component:AddVehicleMakeComponent},
    {path:'Add_City/:Stateid/:Cityid',component:AddCityComponent},
    {path:'Add_State/:CountryId/:StateId',component:AddStateComponent},
    {path:'Add_country/:id',component:CountryAddComponent},
    {path:'Add_owner/:Id',component:AddOwnerComponent},
    {path:'Add_vehicle_Model/:Makeid/:Modelid',component:AddVehicleModelComponent},
    {path:'Add_Customer/:Id',component:AddCustomerComponent},
    // {path:'Add_Reservation/:id',component:Add_ReservationComponent},
    {path:'Add_Driver/:Id',component:AddDriverComponent},
    {path:'Add_Vehicle/:Id',component:AddVehicleComponent},
    {path:'Add_employee/:Id',component:AddEmployeeComponent},


    {path:'Add_owner',component:AddOwnerComponent},
    {path:'Add_City',component:AddCityComponent},
    {path:'Add_vehicle_Model',component:AddVehicleModelComponent},
    {path:'Add_vehicle_Make',component:AddVehicleMakeComponent},
    {path:'Add_employee',component:AddEmployeeComponent},
    {path:'Add_country',component:CountryAddComponent},
    {path:'Add_vehicle_Model',component:AddVehicleModelComponent},
    {path:'Add_vehicle_Make',component:AddVehicleMakeComponent},
    {path:'Add_State',component:AddStateComponent},
    {path:'Add_Customer',component:AddCustomerComponent},
    {path:'Add_Driver',component:AddDriverComponent},
    {path:'Add_Vehicle',component:AddVehicleComponent},
    // {path:'Add_Reservation',component:Add_ReservationComponent}
];