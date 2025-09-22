import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.currentUserSubject.next(res.user);
      })
    );
    
  }



  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserFromStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getRole() {
    const user = this.getUserFromStorage();
    return user ? user.role : null;
  }

  forgetPassword(email: string) {
  return this.http.post(`${this.apiUrl}/forget-password`, { email });
}


resetPassword(token: string, data: any) {
  return this.http.post(`${this.apiUrl}/reset-password/${token}`, data);
}


}
