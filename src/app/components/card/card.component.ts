import { Component, Input, OnInit } from '@angular/core';
import { PacksModel } from 'src/app/models/packs.model';
import { PacksStorageService } from 'src/app/services/packs-storage.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() pack: PacksModel;

  constructor(
    private packStorage: PacksStorageService
  ) {}

  ngOnInit() {
  }

  public checkPacksStorage(): void {
    this.packStorage.checkPacksStorage( this.pack.code );
  }

  public getImgSrc(): string {
    return `../../../assets/img/${this.pack.code}.jpg`;
  }

}
