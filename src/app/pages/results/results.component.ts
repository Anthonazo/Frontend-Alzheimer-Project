import { Component, OnInit } from '@angular/core';
import { AwsPollyService } from '../../services/aws-polly.service';
import { FormsModule } from '@angular/forms';
import { PredictService } from '../../services/predict.service';
import { historialResponse } from '../../Model/radiography';
import { CommonModule } from '@angular/common';
import { Patient } from '../../Model/patient';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit{

  history: historialResponse[] = [];
  patients: Patient[] = [] 

  constructor(private predictService: PredictService, 
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    let id = localStorage.getItem('id')!
    this.userService.getAvaliablePatients(id).subscribe
    (data => {
      this.patients = data as Patient[];
      console.log(this.patients);
    }
  );
  }

  viewRadiographs(patient: Patient) {
    console.log(`Ver radiografías para el paciente:`, patient);
    this.router.navigate(['/radiographs', patient.id], {
      state: { patientData: patient } // Pasamos los datos del paciente
    });
  }
  


}
