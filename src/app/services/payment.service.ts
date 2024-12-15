import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  // API URL for payment-related operations
  private apiUrl = 'https://localhost:44348/api/Payments';  // Adjust this to match your backend API endpoint

  constructor(private http: HttpClient) {}

  // Add a new payment
  addPayment(payment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payment);
  }

  // Get payments for a user
  getPayments(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }
}
