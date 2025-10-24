import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const loggedIn = this.authService.isLoggedIn();
    console.log('AuthGuard canActivate:', loggedIn); // 🔹 Debug
    if (loggedIn) return true;

    this.router.navigate(['/login']);
    return false;
  }
}
