import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  // API URL for address-related operations
  private apiUrl = 'https://localhost:44348/api/Addresses';  // Make sure this matches your backend API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all saved addresses
  getSavedAddresses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new address
  addAddress(address: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, address);
  }

  // Update an existing address
  updateAddress(address: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${address.AddressId}`, address);
  }

  // Remove an address by ID
  removeAddress(AddressId: number): Observable<any> {
    console.log(`Removing address with ID: ${AddressId}`); // Log the ID being sent
    return this.http.delete<any>(`${this.apiUrl}/${AddressId}`)
      .pipe(catchError(error => {
        console.error('Error removing address:', error);
        return throwError(error); // Propagate the error
      }));
  }
}
