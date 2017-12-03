import { AdmAuthGuard } from './../guards/adm-auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdmComponent } from './adm.component';

export const routes: Routes = [
    {
        path: '',
        component: AdmComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard-adm',
                pathMatch: 'full',
            },
            {
                path: 'dashboard-adm',
                loadChildren: 'app/adm/dashboard-adm/dashboard-adm.module#DashboardAdmModule',
                data: { breadcrumb: 'Meus Funcionários' }
            },
            {
                path: 'funcionarios-adm',
                loadChildren: 'app/adm/funcionarios-adm/funcionarios-adm.module#FuncionariosAdmModule',
                data: { breadcrumb: 'Meus Funcionários' }
            },
            {
                path: 'lotes-adm',
                loadChildren: 'app/adm/lotes-adm/lotes-adm.module#LotesAdmModule',
                data: { breadcrumb: 'Meus Lotes' }
            },
            {
                path: 'produtos-adm',
                loadChildren: 'app/adm/produtos-adm/produtos-adm.module#ProdutosAdmModule',
                data: { breadcrumb: 'Meus Produtos' }
            },
            {
                path: 'formas-entrega',
                loadChildren: 'app/adm/formas-entrega/formas-entrega.module#FormasEntregaModule',
                data: { breadcrumb: 'Formas de Pagamento' }
            },
            {
                path: 'formas-pagamento',
                loadChildren: 'app/adm/formas-pagamento/formas-pagamento.module#FormasPagamentoModule',
                data: { breadcrumb: 'Formas de Entrega' }
            },
            {
                path: 'estabelecimento-adm',
                loadChildren: 'app/adm/estabelecimento-adm/estabelecimento-adm.module#EstabelecimentoAdmModule',
                data: { breadcrumb: 'Estabelecimento' }
            },
            {
                path: 'charts',
                loadChildren: 'app/adm/charts/charts.module#ChartsModule',
                data: { breadcrumb: 'Gráficos' }
            },
            {
                path: 'perfil-adm',
                loadChildren: 'app/adm/perfil-adm/perfil-adm.module#PerfilAdmModule',
                data: { breadcrumb: 'Perfil' }
            },
            {
                path: 'privacidade-adm',
                loadChildren: 'app/adm/privacidade-adm/privacidade-adm.module#PrivacidadeAdmModule',
                data: { breadcrumb: 'Privacidade Adm' }
            },
            {
                path: 'pedidos-adm',
                loadChildren: 'app/adm/pedidos-adm/pedidos-adm.module#PedidosAdmModule',
                data: { breadcrumb: 'Pedidos Adm' }
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);





