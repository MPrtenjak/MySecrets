import * as Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import AppData from './app-data';
import EncryptingAppData from './encrypting-app-data';

export default class Database implements IDatabase {
  private settings: ISettings;
  private passphrase: string | undefined;

  private encrypting = new EncryptingAppData();

  constructor(settings: ISettings) {
    this.settings = settings;

    Firebase.initializeApp(this.settings.firebaseConfig);
  }

  public save(data: IAppData): Promise<void> {
    try {
      this._checkSaveLoadRequirements();
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }

    const curentTime = new Date().toISOString();
    const databaseValue = {
      version: '1.0',
      lastWriteTime: curentTime,
      data: this.encrypting.encrypt(data, String(this.passphrase)),
    };

    return Firebase.database().ref(this.__dbRoute).set(databaseValue);
  }

  public load(): Promise<IAppData> {
    try {
      this._checkSaveLoadRequirements();
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }

    return this._readFromDB({ decode: true, passphrase: this.passphrase })
      .then(({ data }) => Promise.resolve(data))
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  public isNewUser(): Promise<boolean> {
    return this._readFromDB({ decode: false })
      .then(({ empty }) => Promise.resolve(empty))
      .catch((err) => {
        console.error(err);
        return Promise.resolve(false);
      });
  }

  public setPassphrase(passphrase: string): Promise<boolean> {
    this.passphrase = passphrase;
    return Promise.resolve(true);
  }

  public checkPassphrase(passphrase: string): Promise<boolean> {
    return this._readFromDB({ decode: true, passphrase })
      .then(() => Promise.resolve(true))
      .catch((err) => {
        console.error(err);
        return Promise.resolve(false);
      });
  }

  private get __dbRoute() {
    if (Firebase.auth().currentUser) {
      return `/${this.settings.firebaseRoot}/${Firebase.auth().currentUser?.uid}`;
    }
  }

  private _checkSaveLoadRequirements() {
    if (!Firebase.auth().currentUser) {
      throw new Error('USER_NOT_LOGGED_IN');
    }

    if (!this.passphrase) {
      throw new Error('PASSPHRASE_NOT_SET');
    }
  }

  private _readFromDB(args: { decode: boolean, passphrase?: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      return Firebase.database().ref(this.__dbRoute).once('value')
        .then((snapshot) => {
          const snapshotValue = snapshot.val();
          const result = {
            empty: !snapshotValue,
            lastWriteTime: snapshotValue?.lastWriteTime,
            data: new AppData(),
          };

          if (args.decode) {
            try {
              result.data = this.encrypting.decrypt(snapshotValue.data, String(args.passphrase));
            } catch (err) {
              reject(err);
            }
          }

          resolve(result);
        });
    });
  }
}
