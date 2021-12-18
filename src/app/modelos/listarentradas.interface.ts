import { CategoriasI } from "./listarcategorias.interface";
import { ComentariosI } from "./listarcomentarios.interface";
import { UsuariosI } from "./listarusuarios.interface";

export interface EntradasI {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: any;
  autor: UsuariosI;
  categoria: CategoriasI;
  comentarios?: ComentariosI;
  created_at: string | Date;
  updated_at: string | Date;
}