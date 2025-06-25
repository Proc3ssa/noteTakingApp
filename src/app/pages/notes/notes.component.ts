import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note';
import { CrudServiceService } from '../../services/crud-service.service';
import { NotecardComponent } from '../../components/notecard/notecard.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-notes',
  imports: [SidebarComponent, CommonModule, NotecardComponent, RouterLink],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit{
  constructor(
    private crudservice: CrudServiceService
  ){}
  ngOnInit(): void {
    this.loadNotes();
  }

  error = false;

   notes: Note[] = []
   selectedCategory: string = 'All';


  loadNotes(tag: string = 'All'): void {
    this.crudservice.getNotes(tag).subscribe({
      next: (notes: Note[]) => {
        this.notes = notes;
      },
      error: (err) => {
        this.error = true;
        console.error('Failed to load notes:', err);
      }
    });
  }


  showModal = true;

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

}
