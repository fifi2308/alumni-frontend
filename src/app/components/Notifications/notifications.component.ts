import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // *ngIf, *ngFor, date pipe
import { FormsModule } from '@angular/forms'; // si besoin de ngModel
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  loading = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.loading = true;
    this.notificationService.getNotifications().subscribe({
      next: (res: any) => {
        this.notifications = res || [];
        this.loading = false;
      },
      error: () => {
        this.notifications = [];
        this.loading = false;
        alert('Erreur lors du chargement des notifications ❌');
      }
    });
  }

  markAsRead(notificationId: number): void {
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () => this.loadNotifications(),
      error: () => alert('Impossible de marquer la notification comme lue ❌')
    });
  }
}
