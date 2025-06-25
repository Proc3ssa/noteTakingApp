import { Component } from '@angular/core';
import { CrudServiceService } from '../../services/crud-service.service';
import { Note } from '../../models/note';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-create',
  imports: [FormsModule, CommonModule, RouterLink],
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
  content: string = '';
  tag: string = '';

  constructor(private crudservice: CrudServiceService, private router: Router) {}

  cancel() {
    this.router.navigate(['/notes']);
  }

  

  submit(){

    if (!this.title || !this.content || !this.tag) return;

    this.data = {
      id: this.id,
      title: this.title,
      content: this.content,
      tag: this.tag,
      isArchived: false,
      createdAt: this.day
    };


    this.crudservice.addNote(this.data).subscribe({
    next: (res) => {
     alert('New note added')
    },
    error: (err) => {
      alert("error adding new post");
    }
  });


}
 

}
