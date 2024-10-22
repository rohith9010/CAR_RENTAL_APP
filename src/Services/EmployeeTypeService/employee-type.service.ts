import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployeetype } from '../../Interfaces/IEmployeetype';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTypeService {

  constructor(private http:HttpClient) { }

private apiUrl = 'https://localhost:7028/api/EmployeeType';

  GetEmployeeType():Observable<IEmployeetype[]>
  {
    return this.http.get<IEmployeetype[]>(this.apiUrl);
  }
  AddEmployeeType(emptype: IEmployeetype): Observable<IEmployeetype> {
    return this.http.post<IEmployeetype>(this.apiUrl, emptype);
  }
  GetEmployeeTypebyId(id: number):Observable<IEmployeetype> {
    return this.http.get<IEmployeetype>(`${this.apiUrl}/${id}`);
  }
  UpdateEmployeeType(emptype: IEmployeetype ):Observable<IEmployeetype>{
    return this.http.put<IEmployeetype>(`${this.apiUrl}/${emptype.EmployeeTypeNo}`,emptype);
  }
  DeleteEmployeeType(id: number): Observable<IEmployeetype> {
    return this.http.delete<IEmployeetype>(`${this.apiUrl}/${id}`);
  }

}
