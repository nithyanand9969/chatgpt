import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatServices } from '../services/chat-services';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class Chat implements OnInit {
  userId: number | null = null;
  userName = '';
  userEmail = '';
  userInitials = '';
  isPaid = false;
showPaymentModal = false;
  showPaymentPrompt = false; // Added this line
  showAuthModal = false; // modal for login/register when not logged in

  chatHistory = [
    { title: 'Startup Talk' },
    { title: 'Job Advice' },
    { title: 'Project Feedback' },
  ];

  userMessage = '';
  messages: { from: 'user' | 'bot', text: string }[] = [];

  constructor(private chatService: ChatServices) {}

  ngOnInit() {
    this.chatService.getCurrentUser().subscribe({
      next: (res) => {
        if (res.logged_in && res.user_id) {
          this.userId = res.user_id;
          this.userName = res.name;
          this.userEmail = res.email;
          this.userInitials = this.userName
            .split(' ')
            .map((w: string) => w[0])
            .join('')
            .toUpperCase();

          // Check if userId is not null before calling checkSubscription
          if (this.userId !== null) {
            this.chatService.checkSubscription(this.userId).subscribe({
              next: (sub) => {
                this.isPaid = sub.paid;
                this.showPaymentModal = !this.isPaid;
              },
              error: () => {
                this.isPaid = false;
                this.showPaymentModal = true;
              }
            });
          } else {
            // Handle the case where userId is null
            this.isPaid = false;
            this.showPaymentModal = true;
          }
        } else {
          this.userId = null;
        }
      },
      error: () => {
        this.userId = null;
      }
    });
  }

sendMessage() {
  if (!this.userMessage.trim()) return;

  if (!this.userId) {
    this.showAuthModal = true;
    return;
  }

  const message = this.userMessage;
  this.messages.push({ from: 'user', text: message });
  this.userMessage = '';

  // Show payment modal logic
  this.chatService.checkSubscription(this.userId).subscribe({
    next: (res) => {
      if (!res.paid) {
        this.showPaymentPrompt = true;
      } else {
        this.chatService.sendMessage(this.userId!, message).subscribe({
          next: (res) => {
            this.messages.push({ from: 'bot', text: res.bot_reply });
          },
          error: () => {
            this.messages.push({ from: 'bot', text: 'Error connecting to server.' });
          }
        });
      }
    },
    error: () => alert('Payment check failed')
  });
}

  loadHistory(history: any) {
    this.messages = [
      { from: 'user', text: `Revisiting: ${history.title}` },
      { from: 'bot', text: 'Chat history content loaded...' }
    ];
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Uploaded file:', file.name);
    }
  }

  redirectToPayment() {
    window.location.href = 'payment';
  }
}
