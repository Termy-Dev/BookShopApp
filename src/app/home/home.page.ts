import { Component, OnInit, Renderer2 } from '@angular/core';
import { Item } from '../services/api-books-interface';
import { ApiBooksService } from '../services/api-books.service';


interface RefresherEventDetail {
  complete(): void;
}

interface RefresherCustomEvent extends CustomEvent {
  detail: RefresherEventDetail;
  target: HTMLIonRefresherElement;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  booksSearched: Item[];
  StartBooks = ["Harry+Potter", "Angular", "Ionic", "Putin"]

  constructor(private service: ApiBooksService, private render: Renderer2) {}

  ngOnInit() {
      this.searchBook(this.randomStartBooks())
  }

  async searchBook(name:string){
    this.booksSearched = (await this.service.searchBook(name)).items
  }

  toggleColorTheme(event){
    if(event.detail.checked){
      this.render.setAttribute(document.body, 'color-theme','dark');
    }else{
      this.render.setAttribute(document.body, 'color-theme','light');
      
    }
  }

  randomStartBooks(){
    let randomBook = this.StartBooks[Math.floor(Math.random() * this.StartBooks.length)];;
    return randomBook
  }


  doRefresh(event: RefresherCustomEvent) {
    this.searchBook(this.randomStartBooks())

    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  

}
