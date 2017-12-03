import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';

import { AcessoService } from './../services/acesso.service';

@Injectable()
export class ShopAuthGuard implements CanActivate {

    constructor(
        private acessoService: AcessoService,
        private router: Router
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot)
        : boolean | Observable<boolean> | Promise<boolean> {
        if(this.acessoService.usuarioShopEstaAutenticado()){
            return true;
        }
        else{
            this.router.navigate(['/login-shop']);
        }        
    }
}