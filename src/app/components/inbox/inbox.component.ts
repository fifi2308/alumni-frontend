import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgIf, NgForOf], 
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  conversations: any[] = [];
  messages: any[] = [];
  newMessage = '';
  selectedUserId: number | null = null;
  currentUser: any;
  selectedConversation: any = null;

  // 🌟 Nouveaux champs
  showNewMessageForm = false;
  newRecipientId: number | null = null;
  allUsers: any[] = [];

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserFromStorage();
    this.loadConversations();

    this.route.params.subscribe(params => {
      const idParam = params['id'];
      if (idParam && idParam !== 'new') {
        this.selectedUserId = +idParam;
        this.updateSelectedConversation();
        this.loadMessages();
      }
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  loadConversations(): void {
    this.messageService.getConversations().subscribe(res => {
      this.conversations = res;
      this.updateSelectedConversation();
    });
  }

  openConversation(userId: number): void {
    this.selectedUserId = userId;
    this.router.navigate(['/inbox', userId]);
    this.loadMessages();
    const conv = this.conversations.find(c => c.user_id === userId);
    if (conv) conv.unread_count = 0;
    this.updateSelectedConversation();
  }

  loadMessages(): void {
    if (!this.selectedUserId) return;
    this.messageService.getMessages(this.selectedUserId).subscribe(res => {
      this.messages = res;
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.selectedUserId) return;

    this.messages.push({
      contenu: this.newMessage,
      sender_id: this.currentUser.id,
      created_at: new Date().toISOString()
    });

    this.messageService.sendMessage(this.selectedUserId, this.newMessage).subscribe(() => {
      this.newMessage = '';
      this.loadMessages();
    });
  }

  // ✅ Ouvrir le formulaire de nouveau message
  openNewMessage(): void {
    this.toggleNewMessageForm();
  }

  toggleNewMessageForm(): void {
    this.showNewMessageForm = !this.showNewMessageForm;

    if (this.showNewMessageForm) {
      this.messageService.getAllUsers().subscribe(users => {
        // Exclure l'utilisateur connecté
        this.allUsers = users.filter(u => u.id !== this.currentUser.id);
      });
    }
  }

  cancelNewMessage(): void {
    this.showNewMessageForm = false;
    this.newRecipientId = null;
    this.newMessage = '';
  }

 startConversation(): void {
  if (!this.newRecipientId) return;

  // 🔹 Conversion string -> number (important pour le select)
  const userId = Number(this.newRecipientId);
  this.selectedUserId = userId;
  this.showNewMessageForm = false;

  // 🔹 Créer une conversation temporaire si elle n’existe pas
  this.selectedConversation = this.conversations.find(c => c.user_id === userId) || {
    user_id: userId,
    user_name: this.allUsers.find(u => u.id === userId)?.name || 'Utilisateur inconnu'
  };

  // 🔹 Charger les messages existants
  this.messages = [];
  this.messageService.getMessages(userId).subscribe(res => {
    this.messages = res;
  });
}


  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  private updateSelectedConversation(): void {
    if (this.selectedUserId) {
      this.selectedConversation = this.conversations.find(c => c.user_id === this.selectedUserId) || null;
    } else {
      this.selectedConversation = null;
    }
  }
}
