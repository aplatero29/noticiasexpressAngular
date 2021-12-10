import { EntradasI } from "./listarentradas.interface";
import { UsuariosI } from "./listarusuarios.interface";

export interface ComentariosI {
  id: number;
  entrada: EntradasI;
  usuario: UsuariosI;
  asunto: string;
  created_at: string | Date;
  updated_at: string | Date;
}