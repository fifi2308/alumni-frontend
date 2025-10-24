import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Génère les headers avec le token JWT
  private getHeaders(): { headers: HttpHeaders } {
    const token = this.authService.getToken(); // récupère le token depuis AuthService
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
  }

  // Récupérer toutes les offres
  getOffers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/offres`, this.getHeaders());
  }

  // Créer une offre (Admin / Entreprise / Alumni)
  createOffer(offer: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/offres`, offer, this.getHeaders());
  }

  // Postuler à une offre avec FormData (nom, prenom, email, tel, cv)
  postuler(formData: FormData): Observable<any> {
    // Ne pas mettre 'Content-Type', Angular gère automatiquement FormData
    return this.http.post<any>(`${this.apiUrl}/postulations`, formData, this.getHeaders());
  }
}
