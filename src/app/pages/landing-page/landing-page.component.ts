import { Component, ViewEncapsulation, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  host:{
      '(window:scroll)': 'updateNavbarColor($event)'
  },
  encapsulation: ViewEncapsulation.None
})
export class LandingPageComponent implements OnInit {
    public router: Router;
    public form:FormGroup;
    
    isScrolled = false;
    currPos: Number = 0;
    startPos: Number = 0;
    changePos: Number = 100;

    constructor(router:Router, fb:FormBuilder){
        this.router = router;
    }

    updateNavbarColor(evt) {
        this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
        if(this.currPos >= this.changePos ) {
            this.isScrolled = true;
        } else {
            this.isScrolled = false;
        }
    }

    public ngOnInit(){

    }

    public ngAfterViewInit(){
        document.getElementById('preloader').classList.add('hide');
    }
}


