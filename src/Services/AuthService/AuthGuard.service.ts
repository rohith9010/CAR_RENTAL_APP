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
          if (response && response.RefreshToken) {
            localStorage.setItem('refreshToken', response.RefreshToken); // Store the refresh token
          }
          return response;
        }));
    }
    refreshToken(): Observable<any> {
      const refreshToken = this.getRefreshToken();
      const apiUrl = `${this.apiUrl}/refresh`; // Adjust the endpoint as needed
  
      return this.http.post<any>(apiUrl, { RefreshToken: refreshToken })
        .pipe(map((response: any) => {
          if (response && response.Token) {
            localStorage.setItem('jwtToken', response.Token); // Store new JWT token
          }
          return response;
        }));
    }
  
    isLoggedIn(): boolean {
      return !!localStorage.getItem('jwtToken');
    }
  
    logout(): void {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('refreshToken');
    }

    gettoken(){
      return localStorage.getItem('jwtToken');
    }

    getRefreshToken() {
      return localStorage.getItem('refreshToken'); // Method to get refresh token
    }

    storetoken(tokenvalue:string){
      if (tokenvalue) {
        localStorage.setItem('jwtToken', tokenvalue);
      } else {
        console.error('Attempted to store an undefined token');
      }
    }

}
