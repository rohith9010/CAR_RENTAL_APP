import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICustomerLogin } from '../../Interfaces/ICustomerLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private apiUrl = 'https://localhost:7028/api/CustomerLogin';

  constructor(private http: HttpClient) { }
  
    login(customerLogin: ICustomerLogin): Observable<any> {
      
      return this.http.post<any>(this.apiUrl, customerLogin)
        .pipe(map((response: any) => {
          if (response && response.token) {
            localStorage.setItem('jwtToken', response.token); // Storing the JWT token in localStorage
          }
          return response;
        }));
    }
  
    isLoggedIn(): boolean {
      return !!localStorage.getItem('jwtToken');
    }
  
    logout(): void {
      localStorage.removeItem('jwtToken');
    }

    gettoken(){
      return localStorage.getItem('jwtToken');
    }

    storetoken(tokenvalue:string){
      if (tokenvalue) {
        localStorage.setItem('jwtToken', tokenvalue);
      } else {
        console.error('Attempted to store an undefined token');
      }
    }

}
