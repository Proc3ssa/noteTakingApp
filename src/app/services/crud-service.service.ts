import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, retry } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler: ErrorService) {}

 getNotes(tag: string = 'All', searchTerm: string = ''): Observable<Note[]> {
    let url = `${this.baseUrl}/notes`;
    let params = new URLSearchParams();
    if (tag !== 'All') {
      params.set('tag', tag);
    }
    if (searchTerm !== '') {
      params.set('searchTerm', searchTerm);
    }
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    return this.http.get<Note[]>(url)
      .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
  }

  addNote(note: Partial<Note>): Observable<Note> {
  return this.http.post<Note>(`${this.baseUrl}/notes`, note)
    .pipe(retry(1), catchError(error => this.errorHandler.handle(error)));
}



  getNote(id: number): Observable<Note> {
  return this.http.get<Note>(`${this.baseUrl}/notes/${id}`)
    .pipe(retry(1), catchError(error => this.errorHandler.handle(error)));
}

  createPost(post: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/posts`, post)
      .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
  }

  updateNote(id: number, post: Partial<Note>): Observable<Note> {
  return this.http.put<Note>(`${this.baseUrl}/notes/${id}`, post)
    .pipe(retry(1), catchError(error => this.errorHandler.handle(error)));
}

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/notes/${id}`)
      .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
  }
  
  signIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, { email, password })
      .pipe(retry(1), catchError((error) => this.errorHandler.handle(error)));
  }
}
