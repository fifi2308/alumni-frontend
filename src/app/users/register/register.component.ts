import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-root',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: any = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'alumni'
  };

  message: string = '';

  constructor(private userService: UserService) { }

  onSubmit() {
    if (this.user.password !== this.user.password_confirmation) {
      this.message = 'Les mots de passe ne correspondent pas.';
      return;
    }

    const payload = {
      name: this.user.nom + ' ' + this.user.prenom,
      email: this.user.email,
      password: this.user.password,
      password_confirmation: this.user.password_confirmation,
      role: this.user.role
    };

    this.userService.register(payload).subscribe({
      next: () => {
        this.message = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
        this.user = { nom: '', prenom: '', email: '', password: '', password_confirmation: '', role: 'alumni' };
      },
      error: (err) => {
        this.message = 'Erreur lors de l’inscription : ' + (err.error.message || 'Veuillez réessayer.');
      }
    });
  }
}

