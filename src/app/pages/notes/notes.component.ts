import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note';
import { CrudServiceService } from '../../services/crud-service.service';
@Component({
  selector: 'app-notes',
  imports: [SidebarComponent, CommonModule],
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


  loadNotes(): void {
    this.crudservice.getNotes().subscribe({
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

}
