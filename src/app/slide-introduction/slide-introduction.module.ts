import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlideIntroductionPageRoutingModule } from './slide-introduction-routing.module';

import { SlideIntroductionPage } from './slide-introduction.page';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlideIntroductionPageRoutingModule,
    SwiperModule
  ],
  declarations: [SlideIntroductionPage]
})
export class SlideIntroductionPageModule {}
