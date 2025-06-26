import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../models/note';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(notes: Note[], searchTerm: string): Note[] {
    if (!notes || !searchTerm) {
      return notes;
    }

    searchTerm = searchTerm.toLowerCase();

    return notes.filter(note =>
      note.title?.toLowerCase().includes(searchTerm) ||
      note.tag?.toLowerCase().includes(searchTerm) ||
      note.content?.toLowerCase().includes(searchTerm)
    );
  }

}