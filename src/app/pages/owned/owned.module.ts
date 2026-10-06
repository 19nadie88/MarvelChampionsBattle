import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnedPageRoutingModule } from './owned-routing.module';

import { OwnedPage } from './owned.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CharacterCardComponent } from 'src/app/components/character-card/character-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnedPageRoutingModule
  ],
  declarations: [OwnedPage, HeaderComponent, CharacterCardComponent]
})
export class OwnedPageModule {}
