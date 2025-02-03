import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorLogin } from '../Model/doctor';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLogged$ = this.isLoggedSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(doctor: DoctorLogin){
    return this.http.post(environment.url + '/login/', doctor);
  }

  notificateLogin(){
    this.isLoggedSubject.next(true);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('logged') === 'true';
  }
}
