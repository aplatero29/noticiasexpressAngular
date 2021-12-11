import { ComentariosI } from "./listarcomentarios.interface";
import { EntradasI } from "./listarentradas.interface";

export interface UsuariosI {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: roles;
  comentarios?: ComentariosI
  entradas?: EntradasI
  remember_token?: string;
  created_at: string | Date;
  updated_at: string | Date;
}

enum roles {
  'Admin',
  'Autor',
  'Usuario'
}