import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { RootObject } from '../services/api-books-interface';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  currentBook: RootObject;

  constructor(private storage : Storage, private route: ActivatedRoute, private ruoter: Router, private alertController: AlertController, private router : Router) {
    this.route.queryParams.subscribe(params => {
      if(this.ruoter.getCurrentNavigation().extras.state){
        this.currentBook = this.ruoter.getCurrentNavigation().extras.state.data;
      }
     })
   }


  ngOnInit() {
    console.log(this.currentBook);
  }


  async buyBook(id:string){
    if(await this.storage.get("arrayBooks") == undefined){
      let arrayId: string[] = [id];
      this.storage.set("arrayBooks", arrayId);
    }else{
      let arrayId = await this.storage.get("arrayBooks");
      arrayId.push(id);
      console.log("array id:" + arrayId)
      this.storage.set("arrayBooks", arrayId);
    }

    console.log(await this.storage.get("arrayBooks"));

  
    this.presentAlert();
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Acquisto Effettuato',
      subHeader: 'Acquisto Effettuato con Sucesso!',
      buttons: [
        {
          text: 'Vai al Profilo',
          handler: () => {
            this.router.navigate(['/profile']);
          }
        }
      ]
    });

    await alert.present();
  }



}
