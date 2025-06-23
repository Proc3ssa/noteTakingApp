import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-walkthrough',
  imports: [RouterLink],
  templateUrl: './walkthrough.component.html',
  styleUrl: './walkthrough.component.scss'
})
export class WalkthroughComponent {

  constructor(public readonly router: Router) {}

}
