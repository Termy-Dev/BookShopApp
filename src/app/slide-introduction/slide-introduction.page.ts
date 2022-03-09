import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-slide-introduction',
  templateUrl: './slide-introduction.page.html',
  styleUrls: ['./slide-introduction.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SlideIntroductionPage implements OnInit {

  constructor(private storage : Storage, private router: Router) { }
  
   ngOnInit() {
    
  }

  async introEnd(){
    await this.storage.set('slide', true);
    this.router.navigate(['/home']);
  }

}
