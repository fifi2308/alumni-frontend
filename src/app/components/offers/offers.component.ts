import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { OffersService } from '../../services/offers.service';
import { AuthService } from '../../services/auth.service';
import { PostulerComponent } from '../postuler/postuler.component';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TitleCasePipe,
    RouterModule,
    PostulerComponent
  ],
  templateUrl: './offers.component.html',
  styleUrl:'./offers.component.css',
})
export class OffersComponent implements OnInit {
  offers: any[] = [];
  newOffer: any = { titre: '', description: '', type: 'emploi' };
  user: any;
  selectedOfferId: number | null = null;

  constructor(
    private offersService: OffersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserFromStorage();
    this.loadOffers();
  }

  loadOffers() {
    this.offersService.getOffers().subscribe({
      next: (res: any[]) => (this.offers = res),
      error: () => (this.offers = []),
    });
  }

  isPublisher(): boolean {
    return ['admin', 'entreprise', 'alumni'].includes(this.user?.role);
  }

  canApply(): boolean {
    return ['etudiant', 'alumni'].includes(this.user?.role);
  }

  createOffer() {
    if (!this.isPublisher()) return;
    this.offersService.createOffer(this.newOffer).subscribe({
      next: (res) => {
        this.offers.push(res);
        this.newOffer = { titre: '', description: '', type: 'emploi' };
      },
      error: (err) =>
        alert(err.error?.message || 'Erreur lors de la création de l’offre'),
    });
  }

  openPostulerForm(offerId: number) {
    this.selectedOfferId = offerId;
  }

  closePostulerForm() {
    this.selectedOfferId = null;
  }
}
