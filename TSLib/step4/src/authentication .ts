import * as Firebase from 'firebase/app';

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
    return new Promise((resolve) => {
      return Firebase.auth().signInWithPopup(this.authProvider)
        .then((result) => resolve(true))
        .catch((err) => {
          console.error(err);
          resolve(false);
      });
    });
  }

  public logout(): Promise<boolean> {
    return new Promise((resolve) => {
      return Firebase.auth().signOut()
        .then(() => resolve(true))
        .catch((err) => {
          console.error(err);
          return Promise.resolve(false);
      });
    });
  }
}
