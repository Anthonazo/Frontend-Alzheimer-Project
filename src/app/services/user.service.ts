import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { UpdateDoctor, Doctor } from '../Model/doctor';
import { Patient } from '../Model/patient';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getDoctor(email: string) {
    return this.http.get(environment.url + '/getprofile/', { params: { email }});
  }

  updateDoctor(newDoctor: UpdateDoctor, email: string) {
    const payload = {
      ...newDoctor,
      emailFromLocalStorage: email
    };
    return this.http.put(environment.url + '/editprofile/', payload);
  }

  updatePassword(email: string, password: string) {
    return this.http.put(environment.url + '/updatepassword/', { email, password });
  }
  
  registerPatient(patient: Patient ) {
    return this.http.post(environment.url + '/createPatient/', patient);
  } 
  
  getAvaliablePatients(id: string) {
    return this.http.get(environment.url + '/getPatients/', { params: { id }});
  }
  

}
