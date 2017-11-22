import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {CreateDrinkComponent} from './create-drink/create-drink.component';
import {MainPageComponent} from "./main-page/main-page.component";
import {DrinkComponent} from "./drink/drink.component";
import {MyPageComponent} from "./my-page/my-page.component";
import {MainGuard} from "./main.guard";


export const appRoutes: Routes = [
    {path:'unauthorized',component:UnauthorizedComponent},
    {path:'main-page',      component:MainPageComponent},
    {path:'drink/create',   component:CreateDrinkComponent, canActivate:[MainGuard]},
    {path:'drink/:id',      component:DrinkComponent},
    {path: 'my-page',       component: MyPageComponent,canActivate:[MainGuard]},
    {path: '',redirectTo: '/main-page', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
