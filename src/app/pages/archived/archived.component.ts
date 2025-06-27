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

  showModal = false;


  
  ngOnInit(): void {

    this.getArchivedNotes();

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
    this.showModal = true;
  }

  closeModalHandler() {
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
