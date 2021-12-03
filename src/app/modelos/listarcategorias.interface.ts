import { EntradasI } from './listarentradas.interface';

export interface CategoriasI {
  id: number;
  nombre: string;
  fecha_creacion: string;
  fecha_modificacion: string;
  entradas?: EntradasI;
}
