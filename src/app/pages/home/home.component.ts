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

  constructor(private service: AwsPollyService){

  }

  nombreUsuario: string | null = ''
  audioUrl: string = '';
  texto: string = ''

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombre');
    this.texto = `¡Bienvenido! Doctor ${this.nombreUsuario}!`;
    console.log('Llega')
    this.service.synthesizeSpeech(this.texto)
      .then(audioBlob => {
        // Crea una URL para el blob de audio
        this.audioUrl = URL.createObjectURL(audioBlob);
        // Reproduce el audio
        const audioElement = new Audio(this.audioUrl);
        audioElement.load();
        audioElement.play().catch(error => {
          console.error('Error al reproducir el audio:', error);
        });
      })
      .catch(error => {
        console.error('Error al sintetizar el habla:', error);
      });
  }

  reproducirAudio() {
    this.service.synthesizeSpeech(this.texto)
      .then(audioBlob => {
        this.audioUrl = URL.createObjectURL(audioBlob);
      })
      .catch(error => {
        console.error('Error al sintetizar el habla:', error);
      });
    const audioElement = new Audio(this.audioUrl);
    audioElement.load();
    audioElement.play().catch(error => {
      console.error(error)
    })
  }


}
