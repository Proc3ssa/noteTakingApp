import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateNoteComponent implements OnInit {
  title = '';
  content = '';
  tag = 'All';
  day = '';
  
  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit(): void {
    const today = new Date();
    this.day = today.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

loading = false;

submit(): void {
  if (!this.title.trim() || !this.content.trim()) return;

  const note = {
    title: this.title.trim(),
    content: this.content.trim(),
    tag: this.tag,
    isArchived: this.tag === 'Archived',
    createdAt: new Date().toISOString()
  };

  this.noteService.addNote(note)
    .then(() => {
      alert('✅ Note created successfully');
      this.router.navigate(['/notes']);
    })
    .catch((err) => {
      console.error('❌ Failed to add note:', err);
      alert('❌ Error creating note');
    });
}



  cancel(): void {
    this.router.navigate(['/notes']);
  }
}
