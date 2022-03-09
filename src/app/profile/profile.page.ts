import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { RootObject } from '../services/api-books-interface';
import { ApiBooksService } from '../services/api-books.service';



interface RefresherEventDetail {
  complete(): void;
}

interface RefresherCustomEvent extends CustomEvent {
  detail: RefresherEventDetail;
  target: HTMLIonRefresherElement;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  myBooks: RootObject[] = [];

  constructor(private storage: Storage, private http: ApiBooksService) { }

  ngOnInit() {
    this.setBooks();

  }

  async setBooks(){
  
    let arryBooks: string[] = await this.storage.get("arrayBooks")

    arryBooks = [...new Set(arryBooks)];

    arryBooks.forEach(async item => {
      this.myBooks.push(await this.http.getBookById(item));
    });

  }


  doRefresh(event: RefresherCustomEvent) {
    this.myBooks = [];
    this.setBooks()

    setTimeout(() => {
      event.target.complete();
    }, 500);
  }






  
}


