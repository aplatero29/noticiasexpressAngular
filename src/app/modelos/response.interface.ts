export interface ResponseI {
  original: {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
  userRol: string;
}

export interface MensajeI {
  message: string;
}
