
interface IEncrypting {
  encrypt(plainMessage: string, password: string): string;

  decrypt(encryptedMessage: string, password: string): string;
}

interface IWebPageData {
  webPage: string;
  userName: string;
  password: string;
  notes: string;
}

interface IAppData {
  pages: IWebPageData[];
  trash: IWebPageData[];
}

interface IEncryptingAppData {
  encrypt(plainMessage: IAppData, password: string): string;

  decrypt(encryptedMessage: string, password: string): IAppData;
}
