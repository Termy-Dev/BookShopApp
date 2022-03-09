import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {


  constructor(private storage : Storage, private router : Router,) {}

  async ngOnInit() {
      await this.storage.create();
      await this.router.navigate([await this.storage.get("slide")? "/home" : "/slide"]);
      
  }
}
