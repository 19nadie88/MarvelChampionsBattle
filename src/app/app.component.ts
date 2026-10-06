import { Component } from '@angular/core';
import { PacksStorageService } from './services/packs-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private packStorage: PacksStorageService
  ) {
    this.packStorage.init();
  }
}
