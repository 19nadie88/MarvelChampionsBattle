import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MarvelcdbService } from '../../services/marvelcdb.service';
import { PacksStorageService } from '../../services/packs-storage.service';
import { switchMap } from 'rxjs/operators';
import { PacksModel } from 'src/app/models/packs.model';
import { CardsModel } from 'src/app/models/cards.model';

@Component({
  selector: 'app-owned',
  templateUrl: './owned.page.html',
  styleUrls: ['./owned.page.scss'],
})
export class OwnedPage{
  public heroes = new Array();
  public villanos = new Array();
  private storedPacks = new Array();
  private storedCards;

  constructor(
    private marvelcbdService: MarvelcdbService,
    public loadingController: LoadingController,
    private packStorage: PacksStorageService
  ) { }


  getEveryPacks() {
    this.marvelcbdService.showLoader().then(() => {
      this.storedPacks?.map(res => {
        this.marvelcbdService.getOwnedlePack(res)
          .pipe(switchMap((value: CardsModel[]) => value))
          .subscribe(cards => {
            if (cards.type_code === 'hero' && this.heroes.findIndex(carta => carta.name === cards.name) === -1) {
              this.heroes.push(cards);
              this.packStorage.storedCards.push(cards);
            } else if (cards.type_code === 'villain' && this.villanos.findIndex(carta => carta.name === cards.name) === -1) {
              this.villanos.push(cards);
              this.packStorage.storedCards.push(cards);
            }
          }
          );
        });
      });
  }

  async ionViewWillEnter() {
    this.storedPacks = await this.packStorage.getStorage( 'packs' );
    this.getEveryPacks();  }

}
