import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RegisterComponent } from './pages/register/register.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [

    {path: 'home', component: MainComponent},
    {path: 'login', component: AuthComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'about', component: AboutComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
    
];
