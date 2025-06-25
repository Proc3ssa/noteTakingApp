import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CrudServiceService } from '../../services/crud-service.service';
import { Router, RouterModule } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private crudService: CrudServiceService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    this.errorMessage = '';
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.crudService.signIn(email, password).subscribe({
        next: (response: any) => {
          // Store the token
          localStorage.setItem('token', response.token);
          // Navigate to home
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          // Navigate to home
          this.router.navigate(['/home']);
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form';
      console.log(this.errorMessage);
    }
  }
}
