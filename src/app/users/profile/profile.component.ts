import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private userService: UserService,  private router: Router,  private authService: AuthService,) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      password_confirmation: ['']
    });
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.profileForm.patchValue({
          name: user.name,
          email: user.email
        });
      },
      error: () => this.message = 'Impossible de charger le profil.'
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.userService.updateProfile(this.profileForm.value).subscribe({
        next: () => this.message = 'Profil mis à jour avec succès !',
        error: (err) => {
          console.log('Erreur backend:', err);
          if (err.error && err.error.errors) {
            this.message = Object.values(err.error.errors).flat().join(' ');
          } else if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Erreur lors de la mise à jour.';
          }
        }
      });
    }
  }

   goToDashboard() {
    const role = this.authService.getRole();
    if (role === 'alumni') this.router.navigate(['/dashboard-alumni']);
    else if (role === 'etudiant') this.router.navigate(['/dashboard-etudiant']);
    else if (role === 'entreprise') this.router.navigate(['/dashboard-entreprise']);
    else if (role === 'admin') this.router.navigate(['/dashboard-admin']);
    else this.router.navigate(['/login']); // fallback si non connecté
  }
  
}

