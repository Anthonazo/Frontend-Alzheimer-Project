import { Component, OnInit } from '@angular/core';
import { Patient } from '../../Model/patient';
import { Router } from '@angular/router';
import { PredictService } from '../../services/predict.service';
import { historialResponse } from '../../Model/radiography';
import { CommonModule } from '@angular/common';

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
  
  constructor(private router: Router, private predictService: PredictService) { }

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
}
