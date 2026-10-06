import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from '../utils/defines';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { PacksModel } from '../models/packs.model';
import { CardsModel } from '../models/cards.model';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MarvelcdbService {
  public isShowingLoader = false;
  public loader: HTMLIonLoadingElement;
  constructor(
    private http: HttpClient,
    public loadingController: LoadingController
  ) { }

  getAvailablePacks(): Observable<PacksModel[]> {
    const url = API_URLS.baseUrl + API_URLS.packsUrl;

    return this.http.get(url).pipe( map( (res: PacksModel[]) => res), catchError(error => throwError(error)));

  }

  getOwnedlePack( code ) {
    const url = API_URLS.baseUrl + API_URLS.ownedUrl.replace('{code}', code);

    return this.http.get(url).pipe( map( (res: CardsModel[]) => res), catchError(error => throwError(error)));

  }

  async showLoader() {
    if (!this.isShowingLoader) {
      this.isShowingLoader = true;
      this.loader = await this.loadingController.create({
        message: 'Cargando...',
        duration: 1000
      });
      return await this.loader.present();
    }
  }
  async stopLoader() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null;
      this.isShowingLoader = false;
    }
  }


}
