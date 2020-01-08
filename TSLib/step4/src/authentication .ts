import * as Firebase from 'firebase/app';
import 'firebase/database';

export default class Authentication implements IAuthentication  {
  private settings: ISettings;
  private authProvider: any;
  private onAuthChange: (user: string | null) => void;

  constructor(settings: ISettings) {
    this.settings = settings;

    this.authProvider = new Firebase.auth.GoogleAuthProvider();

    Firebase.auth().languageCode = this.settings.languageCode;
    this.onAuthChange = this.settings.onAuthChange;
    Firebase.auth().onAuthStateChanged((authUser) => {
      authUser ? this.onAuthChange(authUser.email) : this.onAuthChange(null);
    });
  }

  public login(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public logout(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
