import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Book } from './book';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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

  // public getAll(): Observable<Book[]> {
  //   return this.http.get<Book[]>(this.baseUrl);
  // }

  public save(book: Book) {
    return this.http.post<Book>(this.baseUrl, book);
  }

  // public delete(id: number) {
  //   const url = `${this.baseUrl}/${id}`;

  //   return this.http.delete(url)
  //     .subscribe({
  //       next: data => {
  //         console.log('Delete successful');
  //       },
  //       error: error => {
  //         this.errorMessage = error.message;
  //         console.error('There was an error!', error);
  //       }
  //     });
  // }

  public update(book: Book): void {
    this.http.put<Book>(this.baseUrl, book)
      .subscribe({
        next: data => {
          console.log('Update successful');
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
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
      tap(_ => console.log('Delete successfully')),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  updateBook(book: Book): Observable<any> {
    return this.http.put(this.baseUrl, book, this.httpOptions).pipe(
      tap(_ => console.log('Updated successfully')),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  add(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book, this.httpOptions).pipe(
      tap((newBook: Book) => console.log(`added book w/ id=${newBook.id}`)),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }
  
  // updateHero(book: Book): Observable<Book> {
  //   return this.http.put<Book>(this.baseUrl, book)
  // }

}