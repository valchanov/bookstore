import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Book } from '../book';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { BookService } from '../book.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  book: Book;
  bookForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private bookService: BookService,
    private route: ActivatedRoute) {
  }

  // ngOnInit() {
  //   let bookId = window.localStorage.getItem("book.id");
  //   if (!bookId) {
  //     alert("Invalid action.")
  //     this.router.navigate(['list-user']);
  //     return;
  //   }
  //   this.bookForm = this.formBuilder.group({
  //     id: [''],
  //     username: ['', Validators.required],
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     age: ['', Validators.required],
  //     salary: ['', Validators.required]
  //   });
  // this.bookService.getBook(+bookId)
  //   .subscribe(data => {
  //     this.editForm.setValue(data.result);
  //   });
  // }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.book.title = params['title'];

      this.book = {
        id: null,
        title: params['title'],
        author: params['author'],
        description: params['description'],
        price: params['price']
      }

    });



  }

  onSubmit() {
    // this.apiService.updateUser(this.editForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       if (data.status === 200) {
    //         alert('User updated successfully.');
    //         this.router.navigate(['list-user']);
    //       } else {
    //         alert(data.message);
    //       }
    //     },
    //     error => {
    //       alert(error);
    //     });
  }

  update(id: number): void {
    this.bookService.update(this.book);
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id)
      .subscribe(book => this.book = book);
  }

  submitForm() { }
}
