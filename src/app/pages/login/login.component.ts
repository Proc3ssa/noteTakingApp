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
    const { email, password } = this.loginForm.value;

    this.crudService.signIn(email, password).subscribe({
    next: (response: any) => {
  if (response.token) {
    localStorage.setItem('token', response.token);
    this.router.navigate(['/notes']);
  } else {
    this.errorMessage = 'Invalid server response.';
  }
},

      error: (err: any) => {
        this.errorMessage = err?.error?.error || 'Login failed. Please try again.';
      }
    });
  } else {
    this.errorMessage = 'Please fill out the form';
  }
}

}
