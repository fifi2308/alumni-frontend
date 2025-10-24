  import { Component } from '@angular/core';
  import { Router } from '@angular/router';
  import { AuthService } from '../../services/auth.service';

  @Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent {
    credentials = { email: '', password: '' };
    message = '';

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        // Sauvegarde du token dans le stockage local
        localStorage.setItem('token', response.token);

        // Sauvegarde du rôle et des infos utilisateur
        localStorage.setItem('role', response.user.role);
        localStorage.setItem('user', JSON.stringify(response.user));

        // Redirection vers le dashboard unique
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.message = err.error.message || 'Erreur lors de la connexion.';
      }
    });
  }
}