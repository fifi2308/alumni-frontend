import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  forgetForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgetForm.valid) {
      this.authService.forgetPassword(this.forgetForm.value.email).subscribe({
        next: () => {
          this.message = 'Un email de réinitialisation a été envoyé.';
        },
        error: (err) => {
          this.message = err.error.message || 'Erreur lors de la demande.';
        }
      });
    }
  }
}
