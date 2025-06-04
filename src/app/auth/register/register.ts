import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('password', this.password);

    this.http.post<any>('http://localhost/backend/auth/register.php', formData).subscribe({
      next: (res) => {
        if (res.success) {
          alert('Registered successfully! Proceeding to payment...');
          this.router.navigate(['/payment']);
        } else {
          alert(res.message || 'Registration failed');
        }
      },
      error: () => alert('Something went wrong. Please try again.')
    });
  }
}
