import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  docData,
  updateDoc
} from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

 

 constructor(private firestore: Firestore) {}


 // 🟢 Get all notes
getNotes(): Observable<Note[]> {
  const notesRef = collection(this.firestore, 'notes');
  return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>;
}

// 🟢 Get a single note
getNote(id: string): Observable<Note> {
  const noteDoc = doc(this.firestore, `notes/${id}`);
  return docData(noteDoc, { idField: 'id' }) as Observable<Note>;
}

// 🟢 Add a note
addNote(note: Partial<Note>): Promise<any> {
  const notesRef = collection(this.firestore, 'notes');
  return addDoc(notesRef, note);
}

// 🟢 Update a note
updateNote(id: string, note: Partial<Note>): Promise<void> {
  const noteDoc = doc(this.firestore, `notes/${id}`);
  return updateDoc(noteDoc, note);
}

// 🟢 Delete a note
deleteNote(id: string): Promise<void> {
  const noteDoc = doc(this.firestore, `notes/${id}`);
  return deleteDoc(noteDoc);
}


logout(): void {
  localStorage.removeItem('token');
  
}


}
