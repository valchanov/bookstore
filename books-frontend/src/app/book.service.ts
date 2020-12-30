import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Book } from './book';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = "http://localhost:8080/books";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  errorMessage: any;
  httpClient: any;

  constructor(private http: HttpClient) { }

  public save(book: Book) {
    return this.http.post<Book>(this.baseUrl, book);
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl).pipe(
      tap(_ => console.log('Update successfully')),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => console.log(`fetched book id=${id}`)),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  delete(id: number): Observable<Book> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<Book>(url, this.httpOptions).pipe(
      tap(_ => console.log('Book deleted successfully')),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }
}