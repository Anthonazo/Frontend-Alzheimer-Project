import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RegisterComponent } from './pages/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { UploadimgComponent } from './pages/uploadimg/uploadimg.component';
import { ResultsComponent } from './pages/results/results.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { RadiographsComponent } from './pages/radiographs/radiographs.component';

export const routes: Routes = [

    {path: 'main', component: MainComponent},
    {path: 'login', component: AuthComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'about', component: AboutComponent},
    {path: 'home', component: HomeComponent},
    {path: 'upload', component: UploadimgComponent},
    {path: 'results', component: ResultsComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'registeruser', component: RegisterUserComponent},
    { path: 'radiographs/:id', component: RadiographsComponent }, // Ruta para ver radiografías
    {path: '**', redirectTo: 'main', pathMatch: 'full'}
    
];
