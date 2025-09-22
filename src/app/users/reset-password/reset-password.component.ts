import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
   message: string = '';
  token: string = '';
  email: string = '';


  constructor(private fb: FormBuilder, private userService: UserService,private route: ActivatedRoute) {
    this.resetForm = this.fb.group({
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      new_password_confirmation: ['', Validators.required]
    });
  }

   ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }


   onSubmit(): void {
  if (this.resetForm.valid) {
    const payload = {
      token: this.token,
      email: this.email,
      new_password: this.resetForm.value.new_password,
      new_password_confirmation: this.resetForm.value.new_password_confirmation
    };

    this.userService.resetPasswordForgotten(payload).subscribe({
      next: () => this.message = 'Mot de passe mis à jour avec succès !',
      error: (err) => {
        console.log(err);
        this.message = err.error?.message || 'Erreur lors de la réinitialisation du mot de passe.';
      }
    });
  }
}

}
