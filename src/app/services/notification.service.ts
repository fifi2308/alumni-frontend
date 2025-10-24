import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

interface Notification {
  id: number;
  message: string;
  is_read: boolean;
  sender?: { name: string };
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private headers() {
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.authService.getToken()}` }) };
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notifications`, this.headers()).pipe(
      map(notifications =>
        notifications.map(notif => ({
          ...notif,
          message: notif.sender
            ? `Vous avez reçu un message de ${notif.sender.name}`
            : notif.message
        }))
      )
    );
  }

  getUnreadNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notifications/unread`, this.headers());
  }

  markAsRead(notifId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/notifications/${notifId}/read`, {}, this.headers());
  }
}
