import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CreateDrinkComponent} from './drinks/create-drink/create-drink.component';
const appRoutes: Routes = [
    {path:'createDrink',component:CreateDrinkComponent},
    {path:'login',component:LoginComponent},
    {path: '',redirectTo: '/login', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
