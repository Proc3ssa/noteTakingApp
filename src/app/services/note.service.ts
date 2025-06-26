import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'; // make sure this is imported


import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({ providedIn: 'root' })
export class NoteService {
  constructor(private firestore: Firestore) {}

  // Get all notes
  getNotes(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>;
  }


// Add this to your NoteService class
getArchivedNotes(): Observable<Note[]> {
  const notesRef = collection(this.firestore, 'notes');
  return collectionData(notesRef, { idField: 'id' }).pipe(
    map((notes) => (notes as Note[]).filter(note => note.isArchived))
  );
}



  // Get one note
  getNote(id: string): Observable<Note> {
    const noteRef = doc(this.firestore, `notes/${id}`);
    return docData(noteRef, { idField: 'id' }) as Observable<Note>;
  }

 

  // Update note
  updateNote(id: string, note: Partial<Note>): Promise<void> {
    const noteRef = doc(this.firestore, `notes/${id}`);
    return updateDoc(noteRef, note);
  }

  // Delete note
  deleteNote(id: string): Promise<void> {
    const noteRef = doc(this.firestore, `notes/${id}`);
    return deleteDoc(noteRef);
  }


addNote(note: Partial<Note>) {
  const notesRef = collection(this.firestore, 'notes');
  return addDoc(notesRef, note);
}

}
