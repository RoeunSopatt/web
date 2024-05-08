// ==========================================================>> Core Library
import { Route } from '@angular/router';

// ==========================================================>> Custom Library
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards'
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    // Redirect signed in user to the '/dashboards'
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

    // ============================>> Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'auth',
                loadChildren: () => import('app/main/auth/auth.module').then(m => m.AuthModule),
            },
        ]
    },

    // ============================>> Admin routes & authenticated users
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        canActivate: [AuthGuard],
        children: [

            // =============================>> Dashboard
            {
                path: 'dashboard',
                loadChildren: () => import('app/main/dashboard/dashboard.module').then(m => m.DashboardModule),
                canActivate: [AuthGuard],
            },

            // Product Route
            {
                path: 'product',
                loadChildren: ()=> import('app/main/product/product.main.module').then(m=>m.ProductMainModule),
                canActivate: [AuthGuard],
            },
            // >>>>>>>>>>>>>>>>> Add Ur Code Here <<<<<<<<<<<<<<<<<<<

            // 404 & Catch all
            { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/main/error/error-404.module').then(m => m.Error404Module),canActivate: [AuthGuard]},
            { path: '**', redirectTo: '404-not-found' }
        ]
    }
];
