import { Component, OnInit } from '@angular/core';
import { AwsPollyService } from '../../services/aws-polly.service';
import { FormsModule } from '@angular/forms';
import { PredictService } from '../../services/predict.service';
import { historialResponse } from '../../Model/radiography';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit{

  texto: string = '';
  audioUrl: string | null = null;
  history: historialResponse[] = [];


  constructor(private predictService: PredictService,
     private pollyService: AwsPollyService) {}

  ngOnInit(): void {
    this.getResults();
  }

  getResults() {
    const email = localStorage.getItem('email') ?? '';
    this.predictService.results(email).subscribe(
      data => {
        if (Array.isArray(data)) {
          this.history = data;
          console.log('Historial:', this.history);
        } else {
          console.error('Los datos recibidos no son un array:', data);
        }
      },
      error => {
        console.error('Error al obtener los resultados:', error);
      }
    );
  }

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
