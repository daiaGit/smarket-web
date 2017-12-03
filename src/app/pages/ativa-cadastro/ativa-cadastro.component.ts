import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ativa-cadastro',
  templateUrl: './ativa-cadastro.component.html',
  styleUrls: ['./ativa-cadastro.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AtivaCadastroComponent {

  router: Router;
    
  constructor(router: Router) {
      this.router = router;
  }

  searchResult(): void {
      this.router.navigate(['pages/search']);
  }

  ngAfterViewInit(){
      document.getElementById('preloader').classList.add('hide');                 
  }

}
