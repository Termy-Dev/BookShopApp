import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlideIntroductionPage } from './slide-introduction.page';

const routes: Routes = [
  {
    path: '',
    component: SlideIntroductionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlideIntroductionPageRoutingModule {}
