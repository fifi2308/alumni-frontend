import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:8000/api'; // ton Laravel tourne sur 8000 par défaut

  constructor(private http: HttpClient) { }

 
  register(user: any) {
  return this.http.post('http://localhost:8000/api/register', user);
}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials);
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.API_URL}/profile`);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/profile`, data);
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.API_URL}/password/reset`, { email });
  }
}
