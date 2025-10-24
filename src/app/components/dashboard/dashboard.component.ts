import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // ✅ RouterModule pour routerLink
import { CommonModule } from '@angular/common';          // ✅ CommonModule pour *ngIf
import { TitleCasePipe } from '@angular/common';          // ✅ TitleCasePipe comme pipe

import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, TitleCasePipe], // ✅ imports corrects
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  role: string = ''; // éviter le type string | null
  unreadMessagesCount: number = 0;
  unreadNotificationsCount: number = 0;

  constructor(
    public authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private notificationsService: NotificationService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserFromStorage();
    this.role = this.authService.getRole() || 'utilisateur'; // ✅ gérer null
    this.loadUnreadCounts();
  }

  loadUnreadCounts() {
    this.messageService.getUnreadMessages().subscribe({
      next: (res: any[]) => this.unreadMessagesCount = res.length,
      error: () => this.unreadMessagesCount = 0
    });

    this.notificationsService.getUnreadNotifications().subscribe({
      next: (res: any[]) => this.unreadNotificationsCount = res.length,
      error: () => this.unreadNotificationsCount = 0
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
