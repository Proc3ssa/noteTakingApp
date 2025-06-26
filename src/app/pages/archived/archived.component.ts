import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NotecardComponent } from '../../components/notecard/notecard.component';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-archived',
  standalone: true,
  imports: [SidebarComponent, NotecardComponent, CommonModule],
  templateUrl: './archived.component.html',
  styleUrl: './archived.component.scss'
})
export class ArchivedComponent implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.getArchivedNotes();
  }

  getArchivedNotes(): void {
    this.noteService.getArchivedNotes().subscribe({
      next: (notes) => {
        this.notes = notes;
      },
      error: (err) => {
        console.error('Failed to fetch archived notes:', err);
      }
    });
  }

  openModalHandler() {
    // future settings modal logic
  }
}
