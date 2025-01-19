import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { historialResponse } from '../Model/radiography';

@Injectable({
  providedIn: 'root'
})
export class PredictService {

  constructor(private http: HttpClient) { }

  predict(foto: any, email: string ) {
    return this.http.post(environment.url + '/make/', { foto, email});
  }

  results(email: string): Observable<historialResponse[]> {
    return this.http.get<historialResponse[]>(environment.url + '/getRadio/', {
      params: { email }
    });
  }
  
}
