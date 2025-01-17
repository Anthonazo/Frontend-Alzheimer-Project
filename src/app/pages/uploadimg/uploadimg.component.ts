import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Obtiene el archivo seleccionado
      const reader = new FileReader();

      // Genera una vista previa de la imagen
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        console.log(this.imagePreview);
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage() {
    

  }

}
