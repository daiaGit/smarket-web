import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucesso-cadastro',
  templateUrl: './sucesso-cadastro.component.html',
  styleUrls: ['./sucesso-cadastro.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SucessoCadastroComponent {

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
