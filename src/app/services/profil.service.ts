import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  // 🔹 URL corrigée pour correspondre aux routes Laravel
  private apiUrl = 'http://localhost:8000/api/profil';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // 🔹 Ajouter le token d'authentification
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  // 🔹 Récupérer le profil de l'utilisateur connecté
  getProfil(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // 🔹 Créer un nouveau profil
  createProfil(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { headers: this.getAuthHeaders() });
  }

  // 🔹 Mettre à jour le profil
  updateProfil(data: any): Observable<any> {
    return this.http.put(this.apiUrl, data, { headers: this.getAuthHeaders() });
  }

  // 🔹 Supprimer le profil
  deleteProfil(): Observable<any> {
    return this.http.delete(this.apiUrl, { headers: this.getAuthHeaders() });
  }
}
