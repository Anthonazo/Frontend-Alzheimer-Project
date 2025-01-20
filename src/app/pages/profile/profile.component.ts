import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UpdateUser, User } from '../../Model/user';
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
  user: UpdateUser = new UpdateUser();
  email: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    let email = localStorage.getItem('email') ?? '';
    this.userService.getUser(email).subscribe(
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
        this.userService.updateUser(this.user, email).subscribe(
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
