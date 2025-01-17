import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isLogged = false;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.isLogged$.subscribe(
      (loggedStatus) => {
        this.isLogged = loggedStatus;
      }
    );
  }

  logout(){
    localStorage.removeItem('logged');
    this.isLogged = false;
  }

  login(){
    this.router.navigate(['/login']);
  }

  
  

}
