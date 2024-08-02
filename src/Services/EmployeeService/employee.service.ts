import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployee } from '../../Interfaces/IEmployee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

constructor( private http:HttpClient) { }

private apiUrl = 'https://localhost:7028/api/Employee';

GetEmployee():Observable<IEmployee[]>
  {
    return this.http.get<IEmployee[]>(this.apiUrl);
  }
  AddEmployee(emp: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.apiUrl, emp);
  }
  EmployeebyId(id: number):Observable<IEmployee> {
    return this.http.get<IEmployee>(`${this.apiUrl}/${id}`);
  }
  UpdateEmployee(driver: IEmployee ):Observable<IEmployee>{
    return this.http.put<IEmployee>(`${this.apiUrl}/${driver.EmployeeNo}`,driver);
  }
  DeleteEmployee(id: number): Observable<IEmployee> {
    return this.http.delete<IEmployee>(`${this.apiUrl}/${id}`);
  }

}
