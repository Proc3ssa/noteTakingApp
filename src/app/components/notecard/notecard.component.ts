import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Note } from '../../models/note';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notecard',
  imports: [RouterLink],
  templateUrl: './notecard.component.html',
  styleUrl: './notecard.component.scss'
})

export class NotecardComponent implements OnChanges{

  @Input() note!: Note;


  id = '';
  title = '';
  body = '';
  tag = ''

   ngOnChanges(changes: SimpleChanges) {
    if (changes['note'] && this.note) {
      this.id = this.note.id;
      this.title = this.note.title;
      this.body = this.note.content.slice(0,40) + "...";
      this.tag = this.note.tag;
    }
  }

}
