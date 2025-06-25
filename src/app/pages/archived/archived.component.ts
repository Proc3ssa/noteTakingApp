import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CrudServiceService } from '../../services/crud-service.service';
import { Note } from '../../models/note';
import { NotecardComponent } from '../../components/notecard/notecard.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-archived',
  imports: [SidebarComponent, NotecardComponent, CommonModule],
  templateUrl: './archived.component.html',
  styleUrl: './archived.component.scss'
})
export class ArchivedComponent implements OnInit {

  notes: Note[] = [];

  constructor(private crudService: CrudServiceService) {}

  ngOnInit(): void {
    this.getArchivedNotes();
  }

  getArchivedNotes(): void {
    this.crudService.getNotes('Archived').subscribe(notes => {
      console.log('Archived notes:', notes);
      this.notes = notes;
    });
  }

  openModalHandler(){

  }

}
