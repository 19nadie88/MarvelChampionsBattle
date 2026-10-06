import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsModel } from 'src/app/models/cards.model';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent implements OnInit {
  @Input() character: CardsModel;
  public showBack = false;
  constructor(
    private route: Router
  ) { }

  ngOnInit() {}

  public returnUrl(): string {
    return this.character.imagesrc ? `https://es.marvelcdb.com${this.character.imagesrc}` :
    '../../../assets/img/marvel.jpg'
  }

  public navigateToBattles(): void {
    this.route.navigate(['/battles'], {
      queryParams: {cardId: this.character.code}
    })
  }

}
