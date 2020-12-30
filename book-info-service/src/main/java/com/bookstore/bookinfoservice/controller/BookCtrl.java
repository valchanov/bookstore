package com.bookstore.bookinfoservice.controller;

import com.bookstore.bookinfoservice.model.Book;
import com.bookstore.bookinfoservice.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/books")
@RestController
public class BookCtrl {
    private BookService bookService;

    public BookCtrl(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/{id}")
    public Optional getBookInfo(@PathVariable("id") Long id) {
        return bookService.findBookById(id);
    }

    @GetMapping
    public Iterable getBooksInfo() {
        return bookService.findAllBooks();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        bookService.deleteBook(id);
    }

    @PutMapping
    public void update(@RequestBody Book book){
        bookService.save(book);
    }

    @PostMapping
    public void save(@RequestBody Book book){
        bookService.save(book);
    }
}
