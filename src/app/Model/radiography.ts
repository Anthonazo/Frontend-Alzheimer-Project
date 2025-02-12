export interface PrediccionResponse {
    Prediccion: string;
    Probabilidad: number;
    Radiografia: string;
  }

export interface historialResponse {
    id: number;
    explicacion: string;
    fecha_subida: string;
    imagen_base64: string;
    probabilidad: number;
    dementia_level: string;
    recomendacion: string;
}