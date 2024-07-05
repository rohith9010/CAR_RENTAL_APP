import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomer } from '../../Interfaces/ICustomer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class customerservice{

  private apiUrl = 'https://localhost:7028/api/Customer';

  constructor(private http : HttpClient) { }

  GetCustomer():Observable<ICustomer[]>
  {
    return this.http.get<ICustomer[]>(this.apiUrl);
  }
  AddCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.apiUrl, customer);
  }
  CustomerById(id: number):Observable<ICustomer> {
    return this.http.get<ICustomer>(`${this.apiUrl}/${id}`);
  }
  UpdateCustomer(customer: ICustomer ):Observable<ICustomer>{
    return this.http.put<ICustomer>(`${this.apiUrl}/${customer.CustomerNo}`,customer);
  }
  DeleteCustomer(id: number): Observable<ICustomer> {
    return this.http.delete<ICustomer>(`${this.apiUrl}/${id}`);
  }
}

