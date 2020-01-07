
interface IEncrypting {
  encrypt(plainMessage: string, password: string): string;

  decrypt(encryptedMessage: string, password: string): string;
}
