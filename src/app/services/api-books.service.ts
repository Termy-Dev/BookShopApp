import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootObject } from './api-books-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiBooksService {

  apiBook:string = "https://www.googleapis.com/books/v1/volumes";

  constructor(private http: HttpClient) { }

  searchBook(name: string){
    return this.http.get<RootObject>(this.apiBook + "?q=" + name ).toPromise();
  }

  getBookById(id: string){
    return this.http.get<RootObject>(this.apiBook + "/" + id).toPromise();
  }

  
}
