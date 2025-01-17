import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../Model/user';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLogged$ = this.isLoggedSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(user: UserLogin){
    return this.http.post(environment.url + '/login/', user);
  }

  notificateLogin(){
    this.isLoggedSubject.next(true);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('logged') === 'true';
  }
}
