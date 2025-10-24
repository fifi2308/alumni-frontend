import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
   styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage = '';
  receiverId!: number | null;
  users: any[] = [];
  currentUserId = Number(localStorage.getItem('user_id'));
  isNewChat = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param === 'new') {
      this.isNewChat = true;
      this.loadUsers();
    } else {
      this.receiverId = Number(param);
      this.loadMessages();
    }
  }

  loadMessages() {
    if (!this.receiverId) return;
    this.messageService.getMessages(this.receiverId).subscribe(res => this.messages = res);
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(res => this.users = res);
  }

  startChat() {
    if (!this.receiverId) return;
    this.isNewChat = false;
    this.loadMessages();
  }

  sendMessage() {
    if (!this.receiverId || !this.newMessage.trim()) return;
    this.messageService.sendMessage(this.receiverId, this.newMessage).subscribe(() => {
      this.newMessage = '';
      this.loadMessages();
    });
  }

  backToInbox() {
    this.router.navigate(['/inbox']);
  }
}
