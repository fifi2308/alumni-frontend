import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private headers() {
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.authService.getToken()}` }) };
  }

  getMessages(receiverId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages/${receiverId}`, this.headers());
  }

  sendMessage(receiverId: number, contenu: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/messages`, { receiver_id: receiverId, contenu }, this.headers());
  }

  getUnreadMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/messages/unread`, this.headers());
  }

  markAsRead(messageId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/messages/${messageId}/read`, {}, this.headers());
  }

getAllUsers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/users`, this.headers());
}


  getConversations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/conversations`, this.headers());
  }
}
