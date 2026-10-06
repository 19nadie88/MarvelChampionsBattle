import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BattlesPageRoutingModule } from './battles-routing.module';

import { BattlesPage } from './battles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BattlesPageRoutingModule
  ],
  declarations: [BattlesPage]
})
export class BattlesPageModule {}
