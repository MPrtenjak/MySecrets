import * as Firebase from 'firebase/app';
import 'firebase/database';

export default class Database implements IDatabase {
  private settings: ISettings;

  constructor(settings: ISettings) {
    this.settings = settings;

    Firebase.initializeApp(this.settings.firebaseConfig);
  }

  public save(data: IAppData): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public load(): Promise<IAppData> {
    throw new Error('Method not implemented.');
  }
}
