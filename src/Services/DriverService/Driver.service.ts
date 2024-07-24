import { Injectable } from '@angular/core';
import { IDriver } from '../../Interfaces/IDriver';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private apiUrl = 'https://localhost:7028/api/Drivers';

  constructor(private http : HttpClient) { }

  GetDriver():Observable<IDriver[]>
  {
    return this.http.get<IDriver[]>(this.apiUrl);
  }
  AddDriver(driver: IDriver): Observable<IDriver> {
    return this.http.post<IDriver>(this.apiUrl, driver);
  }
  DriverById(id: number):Observable<IDriver> {
    return this.http.get<IDriver>(`${this.apiUrl}/${id}`);
  }
  UpdateDriver(driver: IDriver ):Observable<IDriver>{
    return this.http.put<IDriver>(`${this.apiUrl}/${driver.DriverNo}`,driver);
  }
  DeleteDriver(id: number): Observable<IDriver> {
    return this.http.delete<IDriver>(`${this.apiUrl}/${id}`);
  }

}
