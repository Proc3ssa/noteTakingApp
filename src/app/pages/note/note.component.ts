import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Note } from '../../models/note';
import { CrudServiceService } from '../../services/crud-service.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-note',
  imports: [SidebarComponent, RouterLink],
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

 toggleArchive(): void {
   this.note.isArchived = !this.note.isArchived;
   this.crudservice.updateNote(this.note.id, this.note).subscribe({
     next: () => {
       this.ngOnInit();
     },
     error: (err) => {
       console.error('Update failed:', err);
       alert('Failed to update note.');
     }
   });
 }

 deleteNote(): void {
 if (confirm('Are you sure you want to delete this note?')) {
    this.crudservice.deleteNote(this.note.id).subscribe({
      next: () => {
        alert('Note deleted successfully.');
        this.router.navigate(['/notes']); // change this to your desired redirect
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Failed to delete note.');
      }
    });
  }
}




}