import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AwsPollyService } from '../../services/aws-polly.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  nombreUsuario: string | null = ''

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombre');
  }
}
