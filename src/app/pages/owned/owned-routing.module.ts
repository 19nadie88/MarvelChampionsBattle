import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnedPage } from './owned.page';

const routes: Routes = [
  {
    path: '',
    component: OwnedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnedPageRoutingModule {}
