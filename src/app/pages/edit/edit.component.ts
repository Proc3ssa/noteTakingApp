import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NoteService } from '../../services/note.service'; // 🔄 use the correct updated service
import { Note } from '../../models/note';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  data: Note = {
    id: 0, // 
    title: '',
    content: '',
    tag: '',
    isArchived: false,
    createdAt: ''
  };

  constructor(
    private noteService: NoteService, // 🔄 use NoteService instead of old CrudServiceService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // no Number()
    if (id) {
      this.noteService.getNote(id).subscribe({
        next: (note: Note) => this.data = note,
        error: (err) => console.error('Error loading note:', err)
      });
    }
  }

  submit(): void {
    if (!this.data.title || !this.data.content || !this.data.tag) {
      alert('All fields are required.');
      return;
    }

    this.noteService.updateNote(String(this.data.id), this.data).then(() => {
      alert("Note updated successfully.");
      this.router.navigate(['/notes', this.data.id]);
    }).catch((err) => {
      console.error('Update failed:', err);
      alert('Could not update note.');
    });
  }
}
