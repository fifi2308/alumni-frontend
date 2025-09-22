import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './dashboard-etudiant.component.html',
  styleUrl: './dashboard-etudiant.component.css'
})
export class DashboardEtudiantComponent {
  user: any;

  constructor(public authService: AuthService, private router: Router) {
    this.user = this.authService.getUserFromStorage();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
