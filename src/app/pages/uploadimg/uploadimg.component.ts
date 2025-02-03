import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PredictService } from '../../services/predict.service';
import { PrediccionResponse } from '../../Model/radiography';
import { UserService } from '../../services/user.service';
import { Patient } from '../../Model/patient';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-uploadimg',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './uploadimg.component.html',
  styleUrl: './uploadimg.component.scss'
})
export class UploadimgComponent implements OnInit {

  selectedFile: any = null;
  imagePreview: any = null;
  base64Content: any = null;
  prediction: PrediccionResponse | null = null;
  patients: Patient[] = [];
  selectedPatient: Patient = new Patient();

  constructor(private predictService: PredictService, private userService: UserService) { } 

  ngOnInit(): void {
    this.getAvaliablePatients();
  }

  

  getAvaliablePatients() {
    let id = localStorage.getItem('id')!;
    this.userService.getAvaliablePatients(id).subscribe(
      (data: Patient) => {
        this.patients = data as Patient[];
      },
      (error) => {
        console.error('Error al obtener los pacientes:', error);
      }
    );
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Obtiene el archivo seleccionado
      const reader = new FileReader();
  
      // Genera una vista previa de la imagen
      reader.onload = () => {
        const base64String = reader.result as string;
        this.imagePreview = base64String; // Mantén la vista previa completa
        this.base64Content = base64String.split(',')[1]; // Contenido limpio sin encabezado
        console.log('Vista previa:', this.imagePreview); // Muestra la vista previa completa
        console.log('Contenido limpio:', this.base64Content); // Muestra solo el contenido base64
        console.log('Base64 content length:', this.base64Content.length); 
      };
  
      reader.readAsDataURL(this.selectedFile);
    }
  }

  
  uploadImage() {
  if (!this.selectedPatient) {
    console.error('No se seleccionó ningún paciente.');
    return;
  }
  console.log('Paciente seleccionado:', this.selectedPatient);
  this.predictService.predict(this.base64Content, this.selectedPatient.id!).subscribe(
    (data: any) => {
      this.prediction = data;
      console.log('Predicción recibida:', data);
    },
    (error) => {
      console.error('Error al predecir:', error);
    }
  );
}


  

}
