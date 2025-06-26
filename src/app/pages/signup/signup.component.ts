import { Component } from '@angular/core';
import { CrudServiceService } from '../../services/crud-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  successMessage = '';
  errorMessage = '';

  constructor(private crudService: CrudServiceService, private router : Router) {}

  onSubmit(): void {
  if (!this.username || !this.email || !this.password || !this.confirmPassword) {
    this.errorMessage = 'Please fill in all fields.';
    this.successMessage = '';
    return;
  }

  if (this.password !== this.confirmPassword) {
    this.errorMessage = 'Passwords do not match.';
    this.successMessage = '';
    return;
  }

  this.crudService.signUp(this.username, this.email, this.password).subscribe({
    next: (res) => {
      this.successMessage = 'Signup successful!';
      this.errorMessage = '';
      
  
      if (res?.token) {
        localStorage.setItem('authToken', res.token);
      }

      // Reset fields
      this.username = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';

      sleep(2);
      this.router.navigate(['/login']);
    },
    error: (err) => {
      this.errorMessage = err?.error?.error || 'Signup failed.';
      this.successMessage = '';
    }
  });
}

}
function sleep(seconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

