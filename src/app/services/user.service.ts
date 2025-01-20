import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { UpdateUser, User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(email: string) {
    return this.http.get(environment.url + '/getprofile/', { params: { email }});
  }

  updateUser(newUser: UpdateUser, email: string) {
    const payload = {
      ...newUser,
      emailFromLocalStorage: email
    };
    return this.http.put(environment.url + '/editprofile/', payload);
  }

  updatePassword(email: string, password: string) {
    return this.http.put(environment.url + '/updatepassword/', { email, password });
  }
  

}
