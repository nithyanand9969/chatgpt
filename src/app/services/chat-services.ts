import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServices {
  private apiUrl = 'http://sanjiviniai.webpagetrading.in';

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/me.php`);
  }

  sendMessage(userId: number, message: string): Observable<any> {
    const formData = new FormData();
    formData.append('user_id', userId.toString());
    formData.append('message', message);
    return this.http.post(`${this.apiUrl}/chat/send-message.php`, formData);
  }

  checkSubscription(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/check-subscription.php?user_id=${userId}`);
  }
}
