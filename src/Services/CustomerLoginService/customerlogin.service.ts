import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CustomerloginService {

private apiUrl = 'https://localhost:7028/api/CustomerLogin';

constructor(private http: HttpClient) { }

}
