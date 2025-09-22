import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
   selector: 'app-root',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  message = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        const role = this.authService.getRole();
        if (role === 'alumni') this.router.navigate(['/dashboard-alumni']);
        else if (role === 'etudiant') this.router.navigate(['/dashboard-etudiant']);
        else if (role === 'entreprise') this.router.navigate(['/dashboard-entreprise']);
        else if (role === 'admin') this.router.navigate(['/dashboard-admin']);
      },
      error: (err) => {
        this.message = err.error.message || 'Erreur lors de la connexion.';
      }
    });
  }
}
