import Encrypting from './encrypting';

export default class EncryptingAppData implements IEncryptingAppData {
  public encrypt(plainMessage: IAppData, password: string): string {
    const jsonString = JSON.stringify(plainMessage);

    const encrypting = new Encrypting();
    return encrypting.encrypt(jsonString, password);
  }

  public decrypt(encryptedMessage: string, password: string): IAppData {
    const encrypting = new Encrypting();
    const val = encrypting.decrypt(encryptedMessage, password);

    return JSON.parse(val);
  }
}
