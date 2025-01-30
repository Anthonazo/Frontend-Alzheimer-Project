import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Patient } from '../../Model/patient';
import { Router } from '@angular/router';
import { PredictService } from '../../services/predict.service';
import { historialResponse } from '../../Model/radiography';
import { CommonModule } from '@angular/common';
//import * as jsPDF from 'jspdf';
import html2canva from 'html2canvas'

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
      }
    );
  }

  sendResults() {
    this.router.navigate(['/results']);
  }

  async printPdf() {
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageHeight = pdf.internal.pageSize.height; // Altura total del PDF
    const margin = 20;
    const maxWidth = 500; // Ancho máximo del texto
    let y = margin;

    for (const record of this.history) {
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = margin;
      }

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(18);
      pdf.text('Reporte', margin, y);
      y += 30;

      pdf.setFontSize(14);
      pdf.text(`Registro ${this.history.indexOf(record) + 1}`, margin, y);
      y += 20;

      pdf.setFontSize(12);
      pdf.text('Radiografía del paciente:', margin, y);
      y += 10;

      if (record.imagen_base64) {
        pdf.addImage(`data:image/jpeg;base64,${record.imagen_base64}`, 'JPEG', margin, y, 200, 200);
        y += 230;
      }

      pdf.text('Tejido del cerebro que se usó para determinar:', margin, y);
      y += 10;

      if (record.explicacion) {
        pdf.addImage(`data:image/jpeg;base64,${record.explicacion}`, 'JPEG', margin, y, 200, 200);
        y += 210;
      }

      pdf.text(`Fecha: ${record.fecha_subida}`, margin, y);
      y += 30;

      pdf.text(`Probabilidad: ${record.probabilidad ? Number(record.probabilidad).toFixed(4) : 'N/A'}%`, margin, y);
      y += 30;

      pdf.text(`Tipo probable: ${record.dementia_level}`, margin, y);
      y += 45;

      // 🔴 Esperar la respuesta de `chatgpt` y pausar por 5 segundos antes de seguir
      try {
        console.log("Esperando respuesta...");
        this.response = await this.chat.chatgpt(record.probabilidad, record.dementia_level);
        console.log("Respuesta obtenida:", this.response);

        await new Promise(resolve => setTimeout(resolve, 8000));

        // 📌 DIVIDIR EL TEXTO LARGO EN LÍNEAS AUTOMÁTICAMENTE
        const wrappedText = pdf.splitTextToSize(this.response, maxWidth);

        // 📌 CONTROLAR QUE NO SE SOBREPASE EL PDF
        wrappedText.forEach((line:any) => {
          if (y + 20 > pageHeight - 50) {  // Si se está por salir de la página
            pdf.addPage();
            y = margin;
          }
          pdf.text(line, margin, y);
          y += 15; // Espaciado entre líneas
        });

      } catch (error) {
        console.error('Error en la generación del reporte:', error);
        pdf.text('Reporte: Error al generar el reporte', margin, y);
        y += 45;
      }

      if (this.history.indexOf(record) < this.history.length - 1) {
        pdf.setDrawColor(200);
        pdf.line(margin, y, pdf.internal.pageSize.width - margin, y);
        y += 65;
      }
    }

    pdf.save('Reporte.pdf');
  }


}
