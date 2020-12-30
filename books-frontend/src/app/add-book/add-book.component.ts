import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book: Book;

  constructor(private router: Router,
    private bookService: BookService) {
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.book = {
      id: null,
      title: f.value.title,
      author: f.value.author,
      description: f.value.description,
      price: f.value.price
    }

    this.bookService.save(this.book)
      .subscribe(data => {
        console.log('Book created successfully');
        alert("Book created successfully.");
      });

    f.reset();
  }

  cancel() {
    this.router.navigate(['/books']);
  }
}
