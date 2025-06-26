import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  login(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (user) => {
          this.successMessage = 'Login successful!';
          localStorage.setItem('token', 'firebase-auth-token');
          this.loading = false;

          setTimeout(() => this.router.navigate(['/home']), 1000);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err?.message || 'Login failed. Please try again.';
        }
      });
    } else {
      this.loading = false;
      this.errorMessage = 'Please fill out the form.';
    }
  }
}