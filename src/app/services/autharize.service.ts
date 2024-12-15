import { Injectable } from '@angular/core';
import { environment } from '../../enviornments/environment';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { User } from '../admin-services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AutharizeService {

  private apiUrlAdmin = 'https://localhost:44348/api/Auth/adminlogin';  // Admin login API URL
  private apiUrlUser = 'https://localhost:44348/api/Auth/userlogin';  // User login API URL
  private apiUrlSignup = 'https://localhost:44348/api/Auth/signup';  // User signup API URL
  private apiUrlProfile = 'https://localhost:44348/api/Users'; // Get user profile data API URL

  private loginStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  loginStatus$ = this.loginStatus.asObservable();
  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  // Update login status
  updateLoginStatus(isLoggedIn: boolean): void {
    this.loginStatus.next(isLoggedIn);
  }

  // Admin Login (username, email, password)
  loginAdmin(username: string, email: string, password: string): Observable<any> {
    const loginData = { username, email, password };
    return this.http.post<any>(this.apiUrlAdmin, loginData).pipe(
      catchError((error) => {
        throw error;  // Handle errors like invalid credentials
      })
    );
  }

  // User Login (username, email, password)
  loginUser(username: string, email: string, password: string): Observable<any> {
    const loginData = { username, email, password };
    return this.http.post<any>(this.apiUrlUser, loginData).pipe(
      catchError((error) => {
        throw error;  // Handle errors like invalid credentials
      })
    );
  }

  // Signup method with userId, username, userImage, email, password
  signup(userName: string, userImage: File, email: string, password: string, RoleId: number): Observable<any> {
    // Create a FormData object to include all fields and the file
    const formData = new FormData();
    formData.append('UserName', userName);
    formData.append('UserImage', userImage);
    formData.append('Email', email);
    formData.append('Password', password);
    formData.append('RoleId', RoleId.toString()); // RoleId must be a string in FormData
  
    // Send the FormData to the server
    return this.http.post<any>(this.apiUrlSignup, formData).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  signupWithImage(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrlSignup, formData);
  }

  // Get user profile by user ID (Fetch data of current logged-in user)
  getUserProfile(): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const decodedToken = this.jwtHelper.decodeToken(token || '');
    const userId = decodedToken ? decodedToken.nameid : null; // Assuming 'nameid' holds user ID in JWT token

    return this.http.get<any>(`${this.apiUrlProfile}/${userId}`).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return sessionStorage.getItem('authToken') !== null;
  }

 // Log out the user
 logout(): void {
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('role');
  this.updateLoginStatus(false); // Update login status
  this.router.navigate(['/home']);
}

 // Store token and role data
 storeAuthData(token: string, role: string): void {
  sessionStorage.setItem('authToken', token);
  sessionStorage.setItem('role', role);
  this.updateLoginStatus(true); // Update login status

}
  // Get the user's role from the stored session token
  getRole(): string {
    return sessionStorage.getItem('role') || '';
  }

  // Decode JWT token and get role
  decodeToken(): any {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }
  
  // Update user profile method
  updateUserProfile(userId: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlProfile}/update/${userId}`, user);
  }
}