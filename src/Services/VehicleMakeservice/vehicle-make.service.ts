import { HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { IVehicleMake_ } from '../../Interfaces/IVehicleMake_';
import { Observable } from 'rxjs';
export type Response = IVehicleMake_
@Injectable({
  providedIn: 'root'
})
export class VehicleMakeService {
  private apiUrl = 'https://localhost:7028/api/VehicleMake';
 
  constructor(private http: HttpClient) { }
  

  getVehicleMake():Observable<IVehicleMake_[]>
  {
    return this.http.get<IVehicleMake_[]>(this.apiUrl);
  }
  AddVehicleMake(vehiclemake: IVehicleMake_): Observable<IVehicleMake_> {
    return this.http.post<IVehicleMake_>(this.apiUrl, vehiclemake);
  }
  getById(id: number):Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }
  updateVehicleMake(vehiclemake: IVehicleMake_ ):Observable<IVehicleMake_>{
    return this.http.put<IVehicleMake_>(`${this.apiUrl}/${vehiclemake.MakeNo}`,vehiclemake);
  }
  deleteVehicleMake(id: number): Observable<IVehicleMake_> {
    return this.http.delete<IVehicleMake_>(`${this.apiUrl}/${id}`);
  }

}
