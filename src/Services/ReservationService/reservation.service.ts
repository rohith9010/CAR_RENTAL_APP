import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReservation } from '../../Interfaces/IReservation';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'https://localhost:7028/api/Rentals';

constructor(private http : HttpClient) { }


  ReservationDetails(): Observable<IReservation[]> {
    return this.http.get<IReservation[]>(`${this.apiUrl}`);
  }
  AddReservation(reservation: IReservation): Observable<IReservation> {
    return this.http.post<IReservation>(this.apiUrl, reservation);
  }
  ReservationById(id: number):Observable<IReservation> {
    return this.http.get<IReservation>(`${this.apiUrl}/${id}`);
  }
  UpdateReservation(reservation: IReservation ):Observable<IReservation>{
    console.log('Fetched reservation:', reservation);

    console.log(reservation.RentalNo);
    return this.http.put<IReservation>(`${this.apiUrl}/${reservation.RentalNo}`,reservation);
  }

  DeleteReservation(id: number): Observable<IReservation> {
    return this.http.delete<IReservation>(`${this.apiUrl}/${id}`);
  }

}
