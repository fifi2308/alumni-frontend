import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:8000/api'; 
  constructor(private http: HttpClient) { }


 
  register(user: any) {
  return this.http.post('http://localhost:8000/api/register', user);
}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials);
  }

private getHeaders() {
  const token = localStorage.getItem('token');
  return {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  };
}

getProfile(): Observable<any> {
  return this.http.get(`${this.API_URL}/profile`, this.getHeaders());
}

updateProfile(data: any): Observable<any> {
    console.log('Token:', localStorage.getItem('token'));
  console.log('Données envoyées:', data);
  return this.http.put(`${this.API_URL}/profile`, data, this.getHeaders());
}

resetPassword(data: any): Observable<any> {
  console.log('Token envoyé :', localStorage.getItem('token'));
  console.log('Données envoyées :', data);
  return this.http.post(`${this.API_URL}/password/update`, data, this.getHeaders());
}


resetPasswordForgotten(data: any): Observable<any> {
  // Pas besoin d'envoyer de token d'authentification ici
  return this.http.post(`${this.API_URL}/reset-password/${data.token}`, {
    email: data.email,
    new_password: data.new_password,
    new_password_confirmation: data.new_password_confirmation
  });
}



  
}
