import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OpenAI } from 'openai'
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {


  constructor(private http: HttpClient) { }



  chatgpt( recordId: number, probabilidad: any, clase: any): Promise<string> {
    const json = {
      "id": recordId,
      "demencia": probabilidad,
      "probabilidad": clase
    };

    return this.http.post<{ Respuesta: string }>(`${environment.url}/modelo/`, json)
      .toPromise()
      .then((data:any) => data.Respuesta)
      .catch(error => {
        console.error('Error en la solicitud:', error);
        return 'Error al obtener respuesta';
      });
  }


}
