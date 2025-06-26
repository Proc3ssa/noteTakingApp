import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NotecardComponent } from '../../components/notecard/notecard.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [SidebarComponent, NotecardComponent,FilterPipe, RouterLink, CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  searchTerm: string = '';
  error: string = '';
  showModal = false;

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe({
      next: (data) => {
        this.notes = data;
        this.filteredNotes = data;
      },
      error: (err) => {
        this.error = 'notes';
      }
    });
  }

  onCategoryChange(event: Event): void {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    if (selectedCategory === 'All') {
      this.filteredNotes = this.notes;
    } else {
      this.filteredNotes = this.notes.filter(note => note.content?.includes(selectedCategory));
    }
  }

  searchNotes(event: Event): void {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm = term;
    this.filteredNotes = this.notes.filter(note =>
      note.title?.toLowerCase().includes(term) ||
      note.content?.toLowerCase().includes(term)
    );
  }

  openModalHandler(): void {
    this.showModal = true;
  }

  closeModalHandler(): void {
    this.showModal = false;
  }

  themeChange(mode: string): void {
    document.body.setAttribute('data-theme', mode);
  }

  onCustomColorChange(event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    document.documentElement.style.setProperty('--custom-color', color);
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Or use router.navigate
  }
}
