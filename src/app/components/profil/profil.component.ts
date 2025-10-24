import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilService } from '../../services/profil.service';

interface Profil {
  id: number;
  parcours_academique: string;
  experiences_professionnelles: string;
  competences: string;
  realisations: string;
}

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profil: Profil = {
    id: 0,
    parcours_academique: '',
    experiences_professionnelles: '',
    competences: '',
    realisations: ''
  };
  isEditing = false; // afficher le profil par défaut si existant
  hasProfil = false;
  loading = false;

  constructor(private profilService: ProfilService) {}

  ngOnInit() {
    this.loadProfil();
  }

  loadProfil() {
    this.loading = true;
    this.profilService.getProfil().subscribe({
      next: (res: any) => {
        if (res && res.profil) {
          this.profil = res.profil;
          this.hasProfil = true;
          this.isEditing = false;
        } else {
          this.hasProfil = false;
          this.isEditing = true;
        }
        this.loading = false;
      },
      error: () => {
        this.hasProfil = false;
        this.isEditing = true;
        this.loading = false;
      }
    });
  }

  saveProfil() {
    if (this.hasProfil) {
      this.profilService.updateProfil(this.profil).subscribe({
        next: () => {
          alert('Profil mis à jour avec succès ✅');
          this.isEditing = false;
        },
        error: () => alert('Erreur lors de la mise à jour du profil ❌')
      });
    } else {
      this.profilService.createProfil(this.profil).subscribe({
        next: (res: any) => {
          alert('Profil créé avec succès 🎉');
          this.hasProfil = true;
          this.isEditing = false;
        },
        error: () => alert('Erreur lors de la création du profil ❌')
      });
    }
  }

  deleteProfil() {
    if (confirm('Voulez-vous vraiment supprimer votre profil ?')) {
      this.profilService.deleteProfil().subscribe({
        next: () => {
          alert('Profil supprimé 🗑️');
          this.hasProfil = false;
          this.isEditing = true;
          this.profil = {
            id: 0,
            parcours_academique: '',
            experiences_professionnelles: '',
            competences: '',
            realisations: ''
          };
        },
        error: () => alert('Erreur lors de la suppression ❌')
      });
    }
  }
}
