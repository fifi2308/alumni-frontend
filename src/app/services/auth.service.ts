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

  constructor(private http: HttpClient, private router: Router) {}

  // 🔹 Connexion utilisateur
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.currentUserSubject.next(res.user);
      })
    );
  }

  // 🔹 Déconnexion utilisateur
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // 🔹 Récupérer le token JWT
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 🔹 Récupérer l'utilisateur depuis le localStorage
  public getUserFromStorage(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // 🔹 Vérifier si connecté
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // 🔹 Obtenir le rôle
  getRole(): string | null {
    const user = this.getUserFromStorage();
    return user ? user.role : null;
  }

  // 🔹 Mot de passe oublié
  forgetPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forget-password`, { email });
  }

  // 🔹 Réinitialiser le mot de passe
  resetPassword(token: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password/${token}`, data);
  }
}
