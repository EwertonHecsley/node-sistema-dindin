import * as bcrypt from 'bcrypt';

export class Encrypter {
  private readonly saltRounds = 10;

  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.saltRounds);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
