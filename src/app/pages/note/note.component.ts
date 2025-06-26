import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [SidebarComponent, RouterLink, CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent implements OnInit {

  note!: Note;
  buttonCont = '';

  constructor(
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.noteService.getNote(id).subscribe({
      next: (data) => {
        this.note = data;
        this.buttonCont = this.note.isArchived ? "Remove from Archive" : "Add to archive";
      },
      error: (err) => {
        console.log("ERROR ME " + err);
      }
    });
  }

  toggleArchive(): void {
    this.note.isArchived = !this.note.isArchived;
    this.noteService.updateNote(String(this.note.id), { isArchived: this.note.isArchived }).then(() => {
      this.ngOnInit();
    }).catch((err) => {
      console.error('Update failed:', err);
      alert('Failed to update note.');
    });
  }

  deleteNote(): void {
    if (confirm('Are you sure you want to delete this note?')) {
      this.noteService.deleteNote(String(this.note.id)).then(() => {
        alert('Note deleted successfully.');
        this.router.navigate(['/notes']);
      }).catch((err) => {
        console.error('Delete failed:', err);
        alert('Failed to delete note.');
      });
    }
  }
}
