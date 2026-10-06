import { Component, OnInit } from '@angular/core';
import { MarvelcdbService } from 'src/app/services/marvelcdb.service';
import { PacksStorageService } from 'src/app/services/packs-storage.service';
import { PacksModel } from '../../models/packs.model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

public packsList: PacksModel[] = new Array();

private storedPacks;

  constructor(
    private marvelcbdService: MarvelcdbService,
    private packStorage: PacksStorageService
  ) {}

  async loadData(): Promise<void> {
    this.marvelcbdService.showLoader().then( () => {
       this.marvelcbdService.getAvailablePacks().subscribe( async res => {
        this.packsList = res;
        this.storedPacks = await this.packStorage.getStorage( 'packs' );
        this.setChecked();
        this.marvelcbdService.stopLoader();
      });
    } );
  }

  setChecked(): void {
    this.storedPacks?.map( res => {
      const index = this.packsList.findIndex( pack => pack.code === res );
      this.packsList[index].checked = true;
    });
  }

  ionViewWillEnter() {
    this.loadData();
  }

}
