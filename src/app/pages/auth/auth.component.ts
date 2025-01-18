import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserLogin } from '../../Model/user';
import { LoginService } from '../../services/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent{

  user: UserLogin = new UserLogin();

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.user).subscribe(
      (data: any) => {
        // Caso exitoso
        this.loginService.notificateLogin();
        localStorage.setItem('logged', 'true');
        localStorage.setItem('nombre', data.name);
        this.router.navigate(['/home']);
        console.log(data);
      },
      (error) => {
        // Caso de error
        console.error('Error al iniciar sesión:', error);
        alert('Credenciales incorrectas. Inténtelo de nuevo.');
      }
    );
  }
  

}
