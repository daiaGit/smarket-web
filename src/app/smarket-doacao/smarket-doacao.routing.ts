import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SmarketDoacaoComponent } from './smarket-doacao.component';

export const routes: Routes = [
    {
        path: '', 
        component: SmarketDoacaoComponent,
        children:[
            { 
                path:'', 
                redirectTo:'dashboard-smarket',
                pathMatch:'full', 
            },
            { 
                path: 'dashboard-smarket', 
                loadChildren: 'app/smarket/dashboard-smarket/dashboard-smarket.module#DashboardSmarketModule',
                data: { breadcrumb: 'Dashboard' }  
            },          
            { 
                path: 'aprovacao', 
                loadChildren: 'app/smarket/aprovacao/aprovacao.module#AprovacaoModule',
                data: { breadcrumb: 'Aprovação' }  
            },
            { 
                path: 'categorias-smarket', 
                loadChildren: 'app/smarket/categorias-smarket/categorias-smarket.module#CategoriasSmarketModule', 
                data: { breadcrumb: 'Categorias' }  
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);