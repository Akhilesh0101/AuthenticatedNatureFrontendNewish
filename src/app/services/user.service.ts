import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:44348/api/Users';  // Your user-related API endpoint

  constructor(private http: HttpClient) {}

  // Check if user exists by username
  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/username/${username}`);
  }
  // Method to store user data in sessionStorage (or memory)
  storeUserData(user: User): void {
    sessionStorage.setItem('UserId', user.UserId.toString());
    sessionStorage.setItem('UserName', user.UserName);
    sessionStorage.setItem('Email', user.Email);
    sessionStorage.setItem('Password',user.Password);
  }

  // Method to get user data from sessionStorage
  getStoredUserData(): User | null {
    const UserId = sessionStorage.getItem('UserId');
    const UserName = sessionStorage.getItem('UserName');
    const Email = sessionStorage.getItem('Email');
    const Password = sessionStorage.getItem('Password')

    if (UserId && UserName && Email && Password) {
      return {
        UserId: parseInt(UserId),
        UserName: UserName,
        Email: Email,
        Password:Password,
      };
    }
    return null;
  }

  // Method to clear stored user data from sessionStorage
  clearUserData(): void {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password')
  }
}