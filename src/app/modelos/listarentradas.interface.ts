export interface EntradasI {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  autor: autor;
  categoria: categoria;
  /*     autor: {
      nombre: string;
      email: string;
    };
    categoria: {
      id: number;
      nombre: string;
    }; */
  created_at: string | Date;
  updated_at: string | Date;
}

interface autor {
  nombre: string;
  email: string;
}

interface categoria {
  id: number;
  nombre: string;
}
