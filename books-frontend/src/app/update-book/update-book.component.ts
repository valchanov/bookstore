import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  book: Book;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {
  }

  ngOnInit() {
    this.book = <Book>{};
    const id = this.route.snapshot.params['id'];

    this.bookService.getBook(+id)
      .subscribe(data => {
        console.log(data)
        this.book = data;
      }, error => console.log(error));
  }

  onSubmit(f: NgForm) {
    this.book = {
      id: this.book.id,
      title: f.value.title,
      author: f.value.author,
      description: f.value.description,
      price: f.value.price
    }

    this.bookService.save(this.book)
      .subscribe(data => {
        console.log('Book updated successfully');
        alert("Book updated successfully.");
      });

    this.router.navigate(['/books']);
  }
}
