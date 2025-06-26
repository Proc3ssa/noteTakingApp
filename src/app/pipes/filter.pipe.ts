import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../models/note';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(notes: Note[], searchTerm: string): Note[] {
    if (!notes || !searchTerm) return notes;
    const term = searchTerm.toLowerCase();
    return notes.filter(note =>
      note.title.toLowerCase().includes(term) ||
      note.content.toLowerCase().includes(term)
    );
  }
}
