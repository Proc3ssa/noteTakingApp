import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splashscreen',
  imports: [],
  templateUrl: './splashscreen.component.html',
  styleUrl: './splashscreen.component.scss'
})
export class SplashscreenComponent {

  constructor(private readonly router:Router){}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['walkthrough']);
    }, 5000);
  }

}
