import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UpdateDoctor, Doctor } from '../../Model/doctor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  password: string = '';
  confirmPassword: string = '';
  user: UpdateDoctor = new UpdateDoctor();
  email: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    let email = localStorage.getItem('email') ?? '';
    this.userService.getDoctor(email).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  updateUser(){
      let email = localStorage.getItem('email') ?? '';
{
        this.userService.updateDoctor(this.user, email).subscribe(
          data => {
            console.log(data);
            this.user = data;
            localStorage.setItem('email', this.user.email!);
            localStorage.setItem('nombre', this.user.username!);
          },
          error => {
            console.log(error);
          }
        )
      }
  }

  updatePassword(){
    if(this.password === this.confirmPassword){
      let email = localStorage.getItem('email') ?? '';
      this.userService.updatePassword(email, this.password).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
    
    }
  }

}
