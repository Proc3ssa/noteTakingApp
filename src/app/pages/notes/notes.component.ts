import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note';
import { CrudServiceService } from '../../services/crud-service.service';
import { NotecardComponent } from '../../components/notecard/notecard.component';
import { RouterLink } from '@angular/router';
import { FilterPipe } from '../../pipes/filter.pipe';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notes',
  imports: [SidebarComponent, CommonModule, NotecardComponent, RouterLink, FilterPipe ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit{
  constructor(
    private crudservice: CrudServiceService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.loadNotes();

     const savedTheme = localStorage.getItem('theme');
     if (savedTheme) {
    this.theme = savedTheme;
    this.themeChange(savedTheme);
  }
  }

  error = false;

   notes: Note[] = []
filteredNotes: Note[] = [];
   selectedCategory: string = 'All';
   searchTerm: string = '';

  loadNotes(tag: string = 'All', searchTerm: string = ''): void {
    this.crudservice.getNotes(tag, searchTerm).subscribe({
      next: (notes: Note[]) => {
        this.notes = notes;
        this.filteredNotes = notes;
      },
      error: (err) => {
        this.error = true;
        console.error('Failed to load notes:', err);
      }
    });
  }

  showModal = false;


  openModalHandler(){
    this.showModal = true;
  }

  closeModalHandler(){
    this.showModal = false;
  }

 filterNotes(tag: string) {
    this.selectedCategory = tag;
    this.loadNotes(tag);
  }

  

  onCategoryChange(event: Event) {
    this.filterNotes((event.target as HTMLSelectElement).value);
  }

  searchNotes(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.loadNotes(this.selectedCategory, this.searchTerm);
  }


theme = 'light';
customBgColor = '#ffffff';
customTextColor = '#000000';

themeChange(theme: string) {
  this.theme = theme;
  const body = document.body;

  body.classList.remove('light-theme', 'dark-theme', 'custom-theme');

  if (theme === 'light') {
    body.classList.add('light-theme');
  } else if (theme === 'dark') {
    body.classList.add('dark-theme');
  } else if (theme === 'custom') {
    body.classList.add('custom-theme');

    
    const customBg = this.customBgColor || '#f0f0f0';
    const customText = this.customTextColor || '#000000';

    body.style.setProperty('--custom-bg', customBg);
    body.style.setProperty('--custom-text', customText);
  }

  // Persist theme type
  localStorage.setItem('theme', theme);
}


onCustomColorChange(event: Event) {
  const color = (event.target as HTMLInputElement).value;
  this.customBgColor = color;
  this.customTextColor = '#000000'; 

  
  localStorage.setItem('theme', 'custom');
  localStorage.setItem('customBgColor', this.customBgColor);
  localStorage.setItem('customTextColor', this.customTextColor);

  this.themeChange('custom');
}

logout(): void {
    this.crudservice.logout();
    this.router.navigate(['/login']);
  }

}
