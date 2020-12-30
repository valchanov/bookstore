import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: any[];

  constructor(private router: Router,
    private bookService: BookService) {
  }

  ngOnInit() {
    this.bookService.getAll().subscribe(data => {
      this.books = data;
      console.log(this.books)
    });
  }

  delete(id: number): void {
    this.books = this.books.filter(book => book.id !== id);
    this.bookService.delete(id).subscribe();
  }

  navigateToAdd(){
    this.router.navigate(['/add']);
  }
}
