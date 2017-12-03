import { ShopAuthGuard } from './../guards/shop-auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ShopComponent } from './shop.component';

export const routes: Routes = [
    {
        path: '', 
        component: ShopComponent,
        children:[
            { 
                path:'', 
                redirectTo:'produtos-shop', 
                canActivate: [ShopAuthGuard], 
                pathMatch:'full' 
            },
            { 
                path: 'produtos-shop', 
                loadChildren: 'app/shop/produtos-shop/produtos-shop.module#ProdutosShopModule',
                canActivate: [ShopAuthGuard],  
                data: { breadcrumb: 'Produtos Shop' }  
            },   
            { 
                path: 'pedidos-shop', 
                loadChildren: 'app/shop/pedidos-shop/pedidos-shop.module#PedidosShopModule',
                canActivate: [ShopAuthGuard], 
                data: { breadcrumb: 'Meus Pedidos' }  
            },   
            { 
                path: 'estabelecimentos-shop', 
                loadChildren: 'app/shop/estabelecimentos-shop/estabelecimentos-shop.module#EstabelecimentosShopModule',
                canActivate: [ShopAuthGuard], 
                data: { breadcrumb: 'Estabelecimentos Shop' } 
            },   
            { 
                path: 'favoritos-shop',
                loadChildren: 'app/shop/favoritos-shop/favoritos-shop.module#FavoritosShopModule',
                canActivate: [ShopAuthGuard], 
                data: { breadcrumb: 'Favoritos Shop' }  
            },
            { 
                path: 'carrinho-shop', 
                loadChildren: 'app/shop/carrinho-shop/carrinho-shop.module#CarrinhoShopModule',
                canActivate: [ShopAuthGuard], 
                data: { breadcrumb: 'Carrinho Shop' }  
            },
            { 
                path: 'meu-perfil-pf', 
                loadChildren: 'app/shop/meu-perfil-pf/meu-perfil-pf.module#MeuPerfilPFModule', 
                canActivate: [ShopAuthGuard],
                data: { breadcrumb: 'Meu Perfil' }  
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
