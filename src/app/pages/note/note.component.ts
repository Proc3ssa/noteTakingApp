import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Note } from '../../models/note';
import { CrudServiceService } from '../../services/crud-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note',
  imports: [SidebarComponent],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent implements OnInit {

  note!:Note;
  buttonCont: string = '';

  constructor(
    private crudservice :CrudServiceService,
    private router : Router,
    private route :ActivatedRoute
  ){}

  ngOnInit(): void {
      
  const id = Number(this.route.snapshot.paramMap.get('id'));
  

  this.crudservice.getNote(id).subscribe({
    next: (data: any) => {
      this.note = {
        id: data.id,
        title: data.title,
        content: data.content,
        isArchived: data.isArchived,
        createdAt: data.createdAt
      } as Note;

      console.log(this.note.isArchived);
      this.buttonCont = this.note.isArchived ? "Remove from Archive" : "Add to archive";
    },
    error: (err) => {
      console.log("ERROR ME" + err)
    }
  })
     
  }



}