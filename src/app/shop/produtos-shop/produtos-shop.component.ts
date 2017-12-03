import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'produtos-shop-blank',
  templateUrl: './produtos-shop.component.html',
  styleUrls: ['./produtos-shop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProdutosShopComponent implements OnInit {

  public mouseOvered: any;

  constructor() { }

  ngOnInit() {  }

}
