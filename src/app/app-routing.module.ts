import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './users/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardAlumniComponent } from './components/dashboard-alumni/dashboard-alumni.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardEtudiantComponent } from './components/dashboard-etudiant/dashboard-etudiant.component';
import { DashboardEntrepriseComponent } from './components/dashboard-entreprise/dashboard-entreprise.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ProfileComponent } from './users/profile/profile.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './users/forget-password/forget-password.component';




 const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  
  { path: 'home', component: HomeComponent },              
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard-alumni', component: DashboardAlumniComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-etudiant', component: DashboardEtudiantComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-entreprise', component: DashboardEntrepriseComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-admin', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },


  
 
  
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
