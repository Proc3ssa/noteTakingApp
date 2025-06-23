import { Component } from '@angular/core';

@Component({
  selector: 'app-create',
  imports: [],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  date = new Date();
  day = this.date.toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }); 

}
