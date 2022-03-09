import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Item } from 'src/app/services/api-books-interface';
import { ApiBooksService } from 'src/app/services/api-books.service';



interface RefresherEventDetail {
  complete(): void;
}

interface RefresherCustomEvent extends CustomEvent {
  detail: RefresherEventDetail;
  target: HTMLIonRefresherElement;
}


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {

  currentBook;
  stars: number[] = [];
  rating: number;

  priceBook: string;
  available: boolean;


  booksSlider: Item[];
  nameBook: string;
  

  constructor(private route: ActivatedRoute, private http: ApiBooksService, private router : Router) { }

  async ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.currentBook = await this.http.getBookById(id);
    this.ratingBook();
    this.preventErrors();
    this.currentBook.volumeInfo.description = this.currentBook.volumeInfo.description.replace(/<[^>]*>/g, '');
    this.convertLang();

    this.nameBook = this.currentBook.volumeInfo.title;
    this.getBooksSlider(this.nameBook);
  }

  ratingBook(){
    if(this.currentBook.volumeInfo.averageRating !== undefined){
      this.rating = Math.floor(Number(this.currentBook.volumeInfo.averageRating));
        for (let i = 0; i < this.rating ; i++) {
          this.stars.push(i);
        }
    }else{
      this.rating = 0;
      this.stars = [1,2,3,4,5]
    }
  }

  convertLang(){
    if(this.currentBook.volumeInfo.language == "en"){
      this.currentBook.volumeInfo.language = "gb"
    }
  }

   buyBook(){
    let checkOut: NavigationExtras = {
      state: { data: this.currentBook}
    }
    this.router.navigate(['/checkout'], checkOut);
  }


  preventErrors(){
    this.currentBook.volumeInfo.title == null ? this.currentBook.volumeInfo.title = "" : null;
    this.currentBook.volumeInfo.subtitle == null ? this.currentBook.volumeInfo.subtitle = "" : null;
    this.currentBook.volumeInfo.authors[0] == null ? this.currentBook.volumeInfo.authors[0] = "" : null;
    this.currentBook.volumeInfo.publishedDate == null ? this.currentBook.volumeInfo.publishedDate = "" : null;
    this.currentBook.volumeInfo.description == null ? this.currentBook.volumeInfo.description = "" : null;
    this.currentBook.volumeInfo.pageCount == null ? this.currentBook.volumeInfo.pageCount = "" : null;
    this.currentBook.volumeInfo.publisher == null ? this.currentBook.volumeInfo.publisher = "" : null;

   if(this.currentBook.saleInfo.listPrice != undefined){
    this.priceBook = "Compra " + this.currentBook.saleInfo.listPrice.amount + "€"
    this.available = true;
   }else{
    this.priceBook = "Non Disponibile"
    this.available = false;
   }
    
  }

  async getBooksSlider(name:string){
      this.booksSlider = (await this.http.searchBook(name)).items;

      const index = this.booksSlider.findIndex(item => item.id === this.currentBook.id);
      this.booksSlider.splice(index,1);

  }


  async doRefresh(event: RefresherCustomEvent) {
   this.currentBook = [];

    const id = this.route.snapshot.params.id;
    this.currentBook = await this.http.getBookById(id);
    this.stars = [];
    this.ratingBook();
    this.preventErrors();
    this.currentBook.volumeInfo.description = this.currentBook.volumeInfo.description.replace(/<[^>]*>/g, '');
    this.convertLang();

    this.nameBook = this.currentBook.volumeInfo.title;
    this.getBooksSlider(this.nameBook);

    setTimeout(() => {
      event.target.complete();
    }, 500);
  }






  /* 
  async doRefresh2(id: string) {
    this.currentBook = [];
 
     this.currentBook = await this.http.getBookById(id);
     this.stars = [];
     this.ratingBook();
     this.preventErrors();
     this.currentBook.volumeInfo.description = this.currentBook.volumeInfo.description.replace(/<[^>]*>/g, '');
     this.convertLang();
 
     this.nameBook = this.currentBook.volumeInfo.title;
     this.getBooksSlider(this.nameBook);
  }
 */



}
