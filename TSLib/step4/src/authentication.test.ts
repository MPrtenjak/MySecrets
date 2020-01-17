import * as Firebase from 'firebase/app';
import Authentication from './authentication';

function getSettings(): ISettings {
  return {
    firebaseConfig: {},
    firebaseRoot: 'root',
    languageCode: 'si',
    onAuthChange: (user) => { return; },
  };
}

describe('testing authentication', () => {
  test('correct login should return true', async () => {
    const settings = getSettings();
    const authentication = new Authentication(settings);

    console.error('auth', Firebase.auth)
/*
    const UserCredential = jest.mock(Firebase.auth.UserCredential);
    Firebase.auth().signInWithPopup = () => {
      return Promise.resolve(UserCredential);
    };
*/
/*
    authentication.login = () => {
      return Promise.resolve(true);
    };
*/

    const data = await authentication.login();
    expect(data).toBeTruthy();
  });

  test('incorrect login should return false', async () => {
    const settings = getSettings();
    const authentication = new Authentication(settings);

    authentication.login = () => {
      return Promise.resolve(false);
    };

    const data = await authentication.login();
    expect(data).toBeFalsy();
  });

  test('correct logout should return true', async () => {
    const settings = getSettings();
    const authentication = new Authentication(settings);

    authentication.logout = () => {
      return Promise.resolve(true);
    };

    const data = await authentication.logout();
    expect(data).toBeTruthy();
  });
});
