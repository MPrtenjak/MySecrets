
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

interface IAuthentication  {
  login(): Promise<boolean>;
  logout(): Promise<boolean>;
}

interface IDatabase {
  save(data: IAppData): Promise<void>;
  load(): Promise<IAppData>;

  isNewUser(): Promise<boolean>;
  setPassphrase(passphrase: string): Promise<boolean>;
  checkPassphrase(passphrase: string): Promise<boolean>;
}

interface ISettings {
  firebaseConfig: object;
  firebaseRoot: string;
  languageCode: string;
  onAuthChange(user: string | null): void;
}
