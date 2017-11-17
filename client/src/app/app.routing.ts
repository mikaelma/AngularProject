import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CreateDrinkComponent} from './drinks/create-drink/create-drink.component';
import {MainPageComponent} from "./main-page/main-page.component";
import {DrinkComponent} from "./drink/drink.component";
import {MyPageComponent} from "./my-page/my-page.component";
import {MainGuard} from "./main.guard";


const appRoutes: Routes = [
    {path:'login',          component:LoginComponent},
    {path:'main-page',      component:MainPageComponent},
    {path:'drink/create',   component:CreateDrinkComponent, canActivate:[MainGuard]},
    {path:'drink/:id',      component:DrinkComponent},
    {path: 'my-page',       component: MyPageComponent},
    {path: '',redirectTo: '/main-page', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
