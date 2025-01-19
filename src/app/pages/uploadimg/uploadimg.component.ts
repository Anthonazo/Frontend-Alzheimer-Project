import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PredictService } from '../../services/predict.service';
import { PrediccionResponse } from '../../Model/radiography';

@Component({
  selector: 'app-uploadimg',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './uploadimg.component.html',
  styleUrl: './uploadimg.component.scss'
})
export class UploadimgComponent {

  selectedFile: any = null;
  imagePreview: any = null;
  base64Content: any = null;
  user: string = '';
  prediction: PrediccionResponse | null = null;


  constructor(private predictService: PredictService) { } 


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
    this.user = localStorage.getItem('email') || '';
    this.predictService.predict(this.base64Content, this.user).subscribe(
      (data: any) => {
        this.prediction = data

      },
      (error) => {
        console.error('Error al predecir:', error);
      }
    );
  }

}
