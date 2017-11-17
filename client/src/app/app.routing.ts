import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CreateDrinkComponent} from './drinks/create-drink/create-drink.component';
import {MainPageComponent} from "./main-page/main-page.component";
import {DrinkComponent} from "./drink/drink.component";


const appRoutes: Routes = [
    {path:'login',          component:LoginComponent},
    {path:'main-page',      component:MainPageComponent},
    {path:'drinks/create',  component:CreateDrinkComponent},
    {path:'drinks/:id',     component:DrinkComponent},
    {path: '',redirectTo: '/main-page', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
