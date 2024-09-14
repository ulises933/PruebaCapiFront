export interface Phone {
    id: number;
    contacto_id: number;
    numero: string;
    tipo: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Email {
    id: number;
    contacto_id: number;
    email: string;
    tipo: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Address {
    id: number;
    contacto_id: number;
    direccion: string;
    ciudad: string;
    estado: string;
    pais: string;
    codigo_postal: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Contact {
    id: number;
    nombre: string;
    notas: string;
    fecha_cumple: string;
    pagina_web: string;
    empresa: string;
    created_at: string;
    updated_at: string;
    telefonos: Phone[];
    emails: Email[];
    direcciones: Address[];
  }
  