import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'favoritos-shop-blank',
  templateUrl: './favoritos-shop.component.html',
  styleUrls: ['./favoritos-shop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FavoritosShopComponent implements OnInit {

  public mouseOvered: any;

  constructor() { }

  ngOnInit() {  }

}
