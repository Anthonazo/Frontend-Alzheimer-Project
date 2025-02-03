import { Component } from '@angular/core';
import { Patient } from '../../Model/patient';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {

  patient: Patient = new Patient();

  constructor(private userService: UserService) { }

  registerPatient(){
    let doctor = parseInt(localStorage.getItem('id')!);
    this.patient.doctor = doctor;
    this.userService.registerPatient(this.patient).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

}
