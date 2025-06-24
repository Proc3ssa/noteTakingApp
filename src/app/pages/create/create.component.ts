import { Component } from '@angular/core';
import { CrudServiceService } from '../../services/crud-service.service';
import { Note } from '../../models/note';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create',
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  id = Math.floor(Math.random() * 1000000);

  date = new Date();
  day = this.date.toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }); 

  data: Note = {
    id: 0,
    title: '',
    content: '',
    tag: '',
    isArchived: false,
    createdAt: this.day
  }; 

  title: string = '';
  body: string = '';
  tag: string = '';

  constructor(private crudservice : CrudServiceService){}

  

  submit(){

    
    this.data = {
      id: this.id,
      title: this.title,
      content: this.body,
      tag: this.tag,
      isArchived: false,
      createdAt: this.day
    };

    console.table(this.data)


  }
}
