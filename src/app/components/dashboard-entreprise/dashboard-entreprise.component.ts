import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
  standalone: false,
  templateUrl: './dashboard-entreprise.component.html',
  styleUrl: './dashboard-entreprise.component.css'
})
export class DashboardEntrepriseComponent {
  user: any;

  constructor(public authService: AuthService, private router: Router) {
    this.user = this.authService.getUserFromStorage();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
