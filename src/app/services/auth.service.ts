import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  // Register user
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post('http://localhost:5000/api/auth/login', credentials);
  }

  // Save the user's email to localStorage after successful login
  setUserEmail(email: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('userEmail', email);
    }
  }

  // Retrieve the stored email from localStorage
  getUserEmail(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('userEmail');
    }
    return null;
  }

  // Clear user data on logout
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('userEmail');
    }
  }
}
