import { Component } from '@angular/core';
import { AwsPollyService } from '../../services/aws-polly.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  texto: string = 'Hola, Bienvenido cabron maricon.';
  audioUrl: string | null = null;

  constructor(private pollyService: AwsPollyService) {}

  reproducirAudio() {
    this.pollyService.synthesizeSpeech(this.texto)
      .then(audioBlob => {
        this.audioUrl = URL.createObjectURL(audioBlob);
      })
      .catch(error => {
        console.error('Error al sintetizar el habla:', error);
      });
  }

}
