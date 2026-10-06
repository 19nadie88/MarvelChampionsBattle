import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BattlesModel } from '../models/battle.model';

@Injectable({
  providedIn: 'root'
})
export class PacksStorageService {

  public storedCards = new Array();
  public storedBattles;
  public storagePacks: Storage | null = null;
  private storedPacks;

  constructor(
    private storage: Storage
  ) {

  }

  async init() {
    const storage = await this.storage.create();
    this.storagePacks = storage;
    this.storedPacks = await this.getStorage( 'packs' );
    this.storedBattles = await this.getStorage( 'battles' );
  }

  async checkPacksStorage( code: string ) {
    if ( this.storedPacks && this.storedPacks?.indexOf( code ) !== -1) {
      this.storedPacks.splice( this.storedPacks.indexOf(code), 1 );
    } else if ( this.storedPacks ) {
      this.storedPacks.push(code);
    } else {
      this.storedPacks = new Array();
      this.storedPacks.push(code);
    }
    this.storagePacks.set('packs', this.storedPacks);
    this.storedPacks = await this.getStorage( 'packs' );
  }

  async getStorage( type: string ) {
    return await this.storagePacks?.get( type );
  }

  async checkBattlesStorage( battle: BattlesModel ) {
    if ( !this.storedBattles?.find( res => res.character === battle.character )) {
      if ( !this.storedBattles ) {
        this.storedBattles = new Array();
      } 
      this.storedBattles.push( battle );
      await this.storagePacks.set('battles', this.storedBattles);
      this.storedBattles = await this.getStorage( 'battles' );
    }
  }

  async setBattles( id:string, versus: string, mode: string ) {
    const selectedBattle = this.storedBattles.find( (res) => res.character === id );
    const selectedBattleIndex = this.storedBattles.findIndex( res => res.character === id );
    this.storedBattles.splice( selectedBattleIndex, 1);
    selectedBattle.modes[ selectedBattle.modes.findIndex( res => res.versus === versus ) ][mode] = true;
    this.storedBattles.push(selectedBattle)
    await this.storagePacks.set('battles', this.storedBattles);
    this.storedBattles = await this.getStorage( 'battles' );

  }

}
