import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVehicleModel } from '../../Interfaces/IVehicleModel';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class VehicleModelService {
  model? : IVehicleModel;
  private apiUrl = 'https://localhost:7028/api/VehicleModel';

constructor(private http: HttpClient) { }

  getVehicleModel():Observable<IVehicleModel[]>
  {
    return this.http.get<IVehicleModel[]>(this.apiUrl);
  }
  AddVehicleModel(model:IVehicleModel):Observable<IVehicleModel>{
    return this.http.post<IVehicleModel>(this.apiUrl , model);
  }
  getModelById(id: number):Observable<IVehicleModel> {
    return this.http.get<IVehicleModel>(`${this.apiUrl}/${id}`);
  }
  updateVehicleModel(model: IVehicleModel):Observable<IVehicleModel>{
    return this.http.put<IVehicleModel>(`${this.apiUrl}/${model.modelno}`,model);
  }
  deleteVehicleModel(id: number): Observable<IVehicleModel> {
    return this.http.delete<IVehicleModel>(`${this.apiUrl}/${id}`);
  }

}
