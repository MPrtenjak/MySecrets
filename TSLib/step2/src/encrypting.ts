export default class Encrypting implements IEncrypting {
  public encrypt(plainMessage: string, password: string): string {
    throw new Error('Method not implemented.');
  }

  public decrypt(encryptedMessage: string, password: string): string {
    throw new Error('Method not implemented.');
  }
}
