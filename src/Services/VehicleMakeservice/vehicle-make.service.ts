import { HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { IVehicleMake_ } from '../../Interfaces/IVehicleMake_';
import { Observable } from 'rxjs';
import { IVehicleModel } from '../../Interfaces/IVehicleModel';

export type Response = IVehicleMake_ | IVehicleModel;
@Injectable({
  providedIn: 'root'
})
export class VehicleMakeService {
  mode1!:IVehicleMake_;
  isMake! : boolean;
  private apiUrl = 'https://localhost:7028/api/VehicleMake';
 
  constructor(private http: HttpClient) { }
  

  getVehicleMake(isMake: boolean):Observable<IVehicleMake_[]>
  {
    return this.http.get<IVehicleMake_[]>(this.apiUrl+`?isMake=${isMake}`);
  }
  AddVehicleMake(model: IVehicleMake_,isMake: boolean): Observable<IVehicleMake_> {
    return this.http.post<IVehicleMake_>(this.apiUrl+`?isMake=${isMake}`, model);
  }
  getById(id: number,isMake: boolean):Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}?isMake=${isMake}`);
  }
  updateVehicleMake(model: IVehicleMake_ ,isMake: boolean):Observable<IVehicleMake_>{
    return this.http.put<IVehicleMake_>(`${this.apiUrl}/${model.MakeNo}?isMake=${isMake}`,model);
  }
  deleteVehicleMake(id: number,isMake: boolean): Observable<IVehicleMake_> {
    return this.http.delete<IVehicleMake_>(`${this.apiUrl}/${id}?isMake=${isMake}`);
  }

}
