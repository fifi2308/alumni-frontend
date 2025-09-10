import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,  // <-- devient standalone
  imports: [CommonModule, FormsModule], // <-- nécessaire pour ngModel et ngForm
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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

  // Création de l'objet à envoyer à Laravel
  const payload = {
    name: this.user.nom + ' ' + this.user.prenom, // Laravel attend 'name'
    email: this.user.email,
    password: this.user.password,
    password_confirmation: this.user.password_confirmation,
    role: this.user.role // ou selon le rôle choisi
  };

  this.userService.register(payload).subscribe({
    next: (res) => {
      this.message = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
      this.user = { nom: '', prenom: '', email: '', password: '', password_confirmation: '' };
    },
    error: (err) => {
      this.message = 'Erreur lors de l’inscription : ' + (err.error.message || 'Veuillez réessayer.');
    }
  });
}

}
