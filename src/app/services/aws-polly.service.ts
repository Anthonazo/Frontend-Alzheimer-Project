import { Injectable } from '@angular/core';

import { PollyClient, SynthesizeSpeechCommand, OutputFormat } from '@aws-sdk/client-polly';

@Injectable({
  providedIn: 'root'
})
export class AwsPollyService {
  private polly: PollyClient;



  constructor() {

    this.polly = new PollyClient({
      region: 'us-east-1', // Cambia a tu región
      credentials: {
        accessKeyId: '',
        secretAccessKey: '',
      },
    });

    // Inicializa el cliente de Polly

   }


   async synthesizeSpeech(text: string, voiceId: string = 'Mia'): Promise<Blob> {
    const params: any = {
      OutputFormat: 'mp3' as OutputFormat, // Asegúrate de usar un valor válido
      Text: text,
      VoiceId: voiceId,
    };

    const command = new SynthesizeSpeechCommand(params);
    const response = await this.polly.send(command);

    if (response.AudioStream instanceof ReadableStream) {
      const reader = response.AudioStream.getReader();
      const chunks: Uint8Array[] = [];

      let result;
      do {
        result = await reader.read();
        if (!result.done) {
          chunks.push(result.value);
        }
      } while (!result.done);

      return new Blob(chunks, { type: 'audio/mpeg' });
    }

    throw new Error('AudioStream no está disponible');
  }
}
