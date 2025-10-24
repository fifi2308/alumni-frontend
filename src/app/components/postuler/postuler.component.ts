import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OffersService } from '../../services/offers.service';

@Component({
  selector: 'app-postuler',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './postuler.component.html',
  styleUrl:'./postuler.component.css',
})
export class PostulerComponent {
  @Input() offreId!: number;
  @Output() closeForm = new EventEmitter<void>();

  form: any = {};
  selectedFile: File | null = null;

  constructor(private offersService: OffersService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitForm() {
    if (!this.selectedFile) {
      alert("Veuillez sélectionner un CV");
      return;
    }

    const formData = new FormData();
    formData.append('offre_id', this.offreId.toString());
    formData.append('nom', this.form.nom || '');
    formData.append('prenom', this.form.prenom || '');
    formData.append('email', this.form.email || '');
    formData.append('telephone', this.form.telephone || '');
    formData.append('cv', this.selectedFile);

    this.offersService.postuler(formData).subscribe({
      next: () => {
        alert("Postulation envoyée !");
        this.form = {};
        this.selectedFile = null;
        this.closeForm.emit(); // ferme le formulaire après envoi
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Erreur lors de la postulation');
      }
    });
  }

  cancel() {
    this.closeForm.emit();
  }
}
