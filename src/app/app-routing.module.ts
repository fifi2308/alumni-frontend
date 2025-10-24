import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { RegisterComponent } from './users/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ProfileComponent } from './users/profile/profile.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './users/forget-password/forget-password.component';
import { ProfilComponent } from './components/profil/profil.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { NotificationsComponent } from './components/Notifications/notifications.component';
import { OffersComponent } from './components/offers/offers.component';
// Guards
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Dashboards
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
 
  // Profil
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilComponent },

  // Password
 { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard] },
{ path: 'reset-password/:token', component: ResetPasswordComponent },

  { path: 'forget-password', component: ForgetPasswordComponent },

  // Messagerie
  { path: 'inbox', component: InboxComponent, canActivate: [AuthGuard] },
  { path: 'inbox/:id', component: InboxComponent, canActivate: [AuthGuard] },

  // Notifications
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
  { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },

  // Fallback
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
