import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layouts/header/header.component";
import { FooterComponent } from "./layouts/footer/footer.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'Frontend_Alzheimer_Prediction';

  // constructor(private router: Router) {}

  // ngOnInit(): void {
  //   if(localStorage.getItem('logged')){
  //     this.router.navigate(['/home']);
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }
}
