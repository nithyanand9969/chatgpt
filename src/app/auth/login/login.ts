import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [FormsModule,],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Please enter both email and password.');
      return;
    }

    console.log('Logging in with', this.email, this.password);
    // TODO: Replace with API call
    this.router.navigate(['/chat']);
  }
}