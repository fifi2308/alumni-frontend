import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

// Composants
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardEtudiantComponent } from './components/dashboard-etudiant/dashboard-etudiant.component';
import { DashboardEntrepriseComponent } from './components/dashboard-entreprise/dashboard-entreprise.component';
import { DashboardAlumniComponent } from './components/dashboard-alumni/dashboard-alumni.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardEtudiantComponent,
    DashboardEntrepriseComponent,
    DashboardAlumniComponent,
    DashboardAdminComponent
  ],
 imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    UsersModule     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
