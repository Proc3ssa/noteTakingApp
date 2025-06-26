import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  signUp(): void {
  this.errorMessage = '';
  this.successMessage = '';

  if (this.password !== this.confirmPassword) {
    this.errorMessage = 'Passwords do not match.';
    return;
  }

  this.authService.signUp(this.email, this.password).subscribe({
    next: (user) => {
      console.log('✅ Signup Success:', user); // DEBUG
      this.successMessage = 'Signup successful!';
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error('❌ Signup Error:', err); // DEBUG
      this.errorMessage = err?.message || 'Signup failed.';
    }
  });
}

}
