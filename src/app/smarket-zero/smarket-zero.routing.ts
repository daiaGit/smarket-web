import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SmarketZeroComponent } from './smarket-zero.component';

export const routes: Routes = [
    {
        path: '', 
        component: SmarketZeroComponent,
        children:[
            { 
                path:'', 
                redirectTo:'dashboard-smarket-zero',
                pathMatch:'full', 
            },
            { 
                path: 'dashboard-smarket-zero', 
                loadChildren: 'app/smarket-zero/dashboard-smarket-zero/dashboard-smarket-zero.module#DashboardSmarketZeroModule',
                data: { breadcrumb: 'Dashboard' }  
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);