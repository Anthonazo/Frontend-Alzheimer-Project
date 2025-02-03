import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Patient } from '../../Model/patient';
import { Router } from '@angular/router';
import { PredictService } from '../../services/predict.service';
import { historialResponse } from '../../Model/radiography';
import { CommonModule } from '@angular/common';
import {jsPDF} from 'jspdf';
import { ChatgptService } from '../../services/chatgpt.service';

@Component({
  selector: 'app-radiographs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radiographs.component.html',
  styleUrl: './radiographs.component.scss'
})
export class RadiographsComponent implements OnInit {

  responses: { [key: number]: string } = {}; // Almacenar las respuestas por ID
  patient: Patient = new Patient();
  history: historialResponse[] = [];
  userPrompt: string = '';
  response: string = '';

  @ViewChildren('content') contentElements!: QueryList<ElementRef>;

  constructor(private router: Router, private predictService: PredictService, private chat: ChatgptService) { }

  ngOnInit(): void {
    this.patient = history.state.patientData;
    if (!this.patient) {
      this.router.navigate(['/patients']);
    }
    this.getRadiographs();
  }

  getRadiographs() {
    this.predictService.results(this.patient.id!).subscribe(
      data => {
        this.history = data;
        console.log(this.history);
      }
    );
  }

  sendResults() {
    this.router.navigate(['/results']);
  }
  
  async processHistory(recordId: number) {
    try {
      // Encuentra el registro correspondiente
      const record = this.history.find(r => r.id === recordId);
      if (record) {
        console.log("Esperando respuesta para:", record.probabilidad, record.dementia_level);
        
        // Obtener respuesta de ChatGPT
        this.responses[recordId] = await this.chat.chatgpt(recordId, record.probabilidad, record.dementia_level);
        
        console.log("Respuesta obtenida:", this.responses[recordId]);

        // Mostramos la respuesta poco a poco
        this.showResponseProgressively(recordId);
      }
    } catch (error) {
      console.error("Error en la comunicación con ChatGPT:", error);
      this.showResponseProgressively(recordId); // Mostrar mensaje de error también de manera progresiva
    }
  }

  showResponseProgressively(recordId: number) {
    let i = 0;
    const response = this.responses[recordId]; // Obtener la respuesta específica para el recordId
    this.responses[recordId] = '';  // Resetear la respuesta para ese recordId

    const intervalId = setInterval(() => {
        if (i < response.length) {
            this.responses[recordId] += response.charAt(i); // Agregar un carácter a la vez
            i++;
        } else {
            clearInterval(intervalId); // Detenemos el intervalo cuando ya no hay más caracteres
        }
    }, 20); // El tiempo entre cada letra es de 50 ms
  }

}
