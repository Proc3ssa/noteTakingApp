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
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
      this.themeChange(savedTheme);
      if (savedTheme === 'custom-theme') {
        const customBg = localStorage.getItem('customBgColor');
        const customText = localStorage.getItem('customTextColor');
        if (customBg) {
          document.documentElement.style.setProperty('--custom-bg', customBg);
        }
        if (customText) {
          document.documentElement.style.setProperty('--custom-text', customText);
        }
      }
    } else {
      // Apply default theme if no preference is found
      this.themeChange('light-theme');
    }

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
    // Remove existing theme classes
    document.body.classList.remove('light-theme', 'dark-theme', 'custom-theme');
    // Add the new theme class
    document.body.classList.add(mode);
    // Save the theme preference
    localStorage.setItem('selectedTheme', mode);
  }
onCustomColorChange(event: Event): void {
  const color = (event.target as HTMLInputElement).value;
  // Set the custom theme CSS variables
  document.documentElement.style.setProperty('--custom-bg', color);
  document.documentElement.style.setProperty('--custom-text', color);
  // Apply the custom theme
  this.themeChange('custom-theme');
  // Save custom theme preferences
  localStorage.setItem('customBgColor', color);
  localStorage.setItem('customTextColor', color);
}


  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Or use router.navigate
  }
}
