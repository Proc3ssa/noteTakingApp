import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CrudServiceService } from '../../services/crud-service.service';
import { Note } from '../../models/note';
import { CommonModule } from '@angular/common';
CommonModule

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule,RouterLink, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  data: Note = {
    id: 0,
    title: '',
    content: '',
    tag: '',
    isArchived: false,
    createdAt: ''
  };

  constructor(
    private crudservice: CrudServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.crudservice.getNote(id).subscribe({
        next: (note: Note) => this.data = note,
        error: (err) => console.error(err)
      });
    }
  }

  submit() {
    if (!this.data.title || !this.data.content || !this.data.tag) return;

    this.crudservice.updateNote(this.data.id, this.data).subscribe({
      next: (updatedNote) => {
        console.log('Updated:', updatedNote);
        this.router.navigate(['/notes', this.data.id]);
      },
      error: (err) => console.error('Update failed:', err)
    });
  }
}
