import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BattlesModel, BattlesModesModel } from 'src/app/models/battle.model';
import { CardsModel } from 'src/app/models/cards.model';
import { PacksStorageService } from 'src/app/services/packs-storage.service';

@Component({
  selector: 'app-battles',
  templateUrl: './battles.page.html',
  styleUrls: ['./battles.page.scss'],
})
export class BattlesPage implements OnInit {

  public flipActive: boolean = false;
  public battles: BattlesModel;
  public battleCharacter: CardsModel;
  public winAllBattles: boolean = false;
  private cardId: string;

  constructor(
    private packStorage: PacksStorageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.cardId = params.cardId;
    });
    this.battleCharacter = this.packStorage.storedCards
    .find( res => res.code === this.cardId);

    await this.setBattles();

  }

  public async setSuccessBattle( versus: string, mode: string ): Promise<void> {
    await this.packStorage.setBattles( this.cardId, versus, mode );
    await this.setBattles();
  }

  private async setBattles(): Promise<void> {
    let battle = this.packStorage.storedBattles?.find( char => char.character === this.cardId); 
    if ( !battle ) {
      this.battles = {
        character: this.cardId,
        type: this.battleCharacter.type_code,
        modes: this.returnModes( this.battleCharacter.type_code === 'hero' ? 'villain' : 'hero' )
      }
      await this.packStorage.checkBattlesStorage( this.battles );
    } else {
      this.battles = battle;
    }

    this.checkAllBattles();
  }

  private returnModes( type:string ) {
    let vsArray: BattlesModesModel[] = new Array();
    this.packStorage.storedCards.map( res => {
      if ( res.type_code === type ) {
        const vs = {
          versus: res.name,
          easy: this.checkModes(res, "easy"),
          hard: this.checkModes(res, "hard")
        }
        vsArray.push(vs);
      }
    })
    return vsArray;
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  flipCard() {
    if( this.battleCharacter.linked_card ) {
      this.flipActive = !this.flipActive;
    }
  }

  getImgSrc( str: string ) {
    return  `https://es.marvelcdb.com${str}`
  }

  ngOnDestroy(): void {
    this.flipActive = false;
  }

  checkAllBattles(): void {
    this.battles.modes.map( res => {
      if ( !res.easy || !res.hard ) {
        this.winAllBattles = false;
        return;
      } else {
        this.winAllBattles = true;
      }
    })
  }

  checkModes( personaje: CardsModel, diff: string ):boolean {
    let result: boolean = false;

    this.packStorage.storedBattles?.find( res => {
      res.character === personaje.code && res.modes.map( mode => {
        if (mode.versus === this.battleCharacter.name){
          result = mode[diff];
        } 
      })
    })
    return result;
  }

}
