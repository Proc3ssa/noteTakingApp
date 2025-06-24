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

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/notes`)
      .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
  }


   getPost(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}/posts/${id}`)
      .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
  }

  createPost(post: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/posts`, post)
      .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
  }

  updatePost(id: number, post: Partial<Comment>): Observable<Comment> {
    return this.http.put<Comment>(`${this.baseUrl}/posts/${id}`, post)
      .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`)
      .pipe(retry(1), catchError(error => this.errorHandler.handle(error)))
;
  }
  
}
