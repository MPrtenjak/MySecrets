import EncryptingAppData from './encrypting';

export default class CryptingItems implements IEncryptingAppData {
  public encrypt(plainMessage: IAppData, password: string): string {
    const jsonString = JSON.stringify(plainMessage);

    const crypting = new EncryptingAppData();
    return crypting.encrypt(jsonString, password);
  }

  public decrypt(encryptedMessage: string, password: string): IAppData {
    const crypting = new EncryptingAppData();
    const val = crypting.decrypt(encryptedMessage, password);

    return JSON.parse(val);
  }
}
