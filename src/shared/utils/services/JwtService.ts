import jwt from 'jsonwebtoken';

export class JwtService {
  constructor(private readonly secret: string) {}

  sign(payload: object, expiresIn = '1d'): string {
    return jwt.sign(payload, this.secret, { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] });
  }

  verify<T = any>(token: string): T {
    return jwt.verify(token, this.secret) as T;
  }
}
