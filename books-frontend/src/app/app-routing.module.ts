import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BooksListComponent } from './books-list/books-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UpdateBookComponent } from './update-book/update-book.component';


const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BooksListComponent },
  { path: 'update/:id', component: UpdateBookComponent },
  { path: 'add', component: AddBookComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }