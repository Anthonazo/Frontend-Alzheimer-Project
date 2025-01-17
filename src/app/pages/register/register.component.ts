import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../Model/user';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  register: User = new User();
  password: string = '';

  constructor(private registerService: RegisterService) { }

  registerUser(){
    if(this.register.password === this.password){
      this.registerService.register(this.register).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
    } else {
      alert('Passwords do not match');
    }

  }

}
