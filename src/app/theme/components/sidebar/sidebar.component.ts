import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ]
})
export class SidebarComponent implements OnInit {  
  public settings: Settings;
  public menuItems:Array<any>;
  public tipoPagina:any;

  constructor(public appSettings:AppSettings, public menuService:MenuService) {
      this.settings = this.appSettings.settings;
      this.tipoPagina = localStorage.getItem('tipoPagina');
      if(this.tipoPagina == 'home'){
        this.menuItems = this.menuService.getVerticalMenuItems();
      }
      else if(this.tipoPagina == 'shop'){
        this.menuItems = this.menuService.getVerticalMenuShopItems();
      }
      else if(this.tipoPagina == 'estabelecimento'){
        this.menuItems = this.menuService.getVerticalMenuEstabelecimentoItems();
      }
      else if(this.tipoPagina == 'smarket'){
        this.menuItems = this.menuService.getVerticalMenuSmarketItems();
      }
  }

  ngOnInit() {     
    if(sessionStorage["userMenuItems"]) {
      let ids = JSON.parse(sessionStorage.getItem("userMenuItems"));
      let newArr = [];
      ids.forEach(id => {
        let newMenuItem = this.menuItems.filter(mail => mail.id == id);
        newArr.push(newMenuItem[0]);
      });
      this.menuItems = newArr; 
    }
  }

  public closeSubMenus(){
    let menu = document.querySelector("#menu0");
    for (let i = 0; i < menu.children.length; i++) {
        let child = menu.children[i].children[1]; 
        if(child){
            if(child.classList.contains('show')){
              child.classList.remove('show');
              menu.children[i].children[0].classList.add('collapsed'); 
            }             
        }
    }
  }


}
