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

function getAuth(): IAuthentication {
  const settings = getSettings();
  return new Authentication(settings);
}

describe('testing authentication', () => {
  test('correct login should return true', async () => {
    (Firebase.auth() as any)['signInSuccess'] = true

    const authentication = getAuth()
    const data = await authentication.login()
    expect(data).toBeTruthy()
  });

  test('incorrect login should return false', async () => {
    (Firebase.auth() as any)['signInSuccess'] = false

    const authentication = getAuth()
    const data = await authentication.login();
    expect(data).toBeFalsy();
  });

  test('correct logout should return true', async () => {
    (Firebase.auth() as any)['signOutSuccess'] = true

    const authentication = getAuth()
    const data = await authentication.logout();
    expect(data).toBeTruthy();
  });

  test('incorrect logout should return false', async () => {
    (Firebase.auth() as any)['signOutSuccess'] = false

    const authentication = getAuth()
    const data = await authentication.logout();
    expect(data).toBeFalsy();
  });
});
