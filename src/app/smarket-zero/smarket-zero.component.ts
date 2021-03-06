import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from '../app.settings';
import { Settings } from '../app.settings.model';


@Component({
  selector: 'app-smarket-zero',
  templateUrl: './smarket-zero.component.html',
  styleUrls: ['./smarket-zero.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SmarketZeroComponent implements OnInit {
    public showMenu:boolean = false;
    public showSetting:boolean = false;
    public menus = ['vertical', 'horizontal'];
    public menuOption:string;
    public menuTypes = ['default', 'compact', 'mini'];
    public menuTypeOption:string;
    public tipoPagina: any;     
    public settings: Settings;
    constructor(public appSettings:AppSettings, public router:Router){        
        this.settings = this.appSettings.settings;
        this.tipoPagina = "smarket";
        localStorage.setItem('tipoPagina', this.tipoPagina); 
        if(sessionStorage["skin"]) {
            this.settings.theme.skin = sessionStorage["skin"];
        }     
    }

    ngOnInit() {        
        if(window.innerWidth <= 768){
            this.settings.theme.showMenu = false;
            this.settings.theme.sideChatIsHoverable = false;
        }
        this.showMenu = this.settings.theme.showMenu;
        this.menuOption = this.settings.theme.menu;
        this.menuTypeOption = this.settings.theme.menuType;
        
        this.chooseMenu('vertical');
        this.chooseMenuType('compact');
    }

    public chooseMenu(menu){
        this.settings.theme.menu = menu;    
    }

    public chooseMenuType(menuType){
        this.settings.theme.menuType = menuType;
    }

    public changeTheme(theme){
        this.settings.theme.skin = theme;
        sessionStorage["skin"] = theme;        
    }
 
    ngAfterViewInit(){
        document.getElementById('preloader').classList.add('hide');
    }

    @HostListener('window:resize')
    public onWindowResize():void {
        let showMenu= !this._showMenu();

        if (this.showMenu !== showMenu) {
            this.showMenuStateChange(showMenu);
        }
        this.showMenu = showMenu;
    }

    public showMenuStateChange(showMenu:boolean):void {
        this.settings.theme.showMenu = showMenu;
    }

    private _showMenu():boolean {
        return window.innerWidth <= 768;
    }
}