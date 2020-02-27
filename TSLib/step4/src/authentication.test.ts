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

function getAuthAndCheckConsole(): IAuthentication {
  jest.clearAllMocks();
  jest.spyOn(global.console, 'error');
  jest.spyOn(Firebase.auth(), 'onAuthStateChanged');

  const settings = getSettings();
  return new Authentication(settings);
}

function setMockObject(property: string, value: boolean): void {
  (Firebase.auth() as any)[property] = value;
}

describe('testing authentication', () => {
  test('correct login should return true', async () => {
    setMockObject('signInSuccess', true);

    const authentication = getAuthAndCheckConsole();
    const data = await authentication.login();
    expect(data).toBeTruthy();
    expect(console.error).not.toHaveBeenCalled();
    expect(Firebase.auth().onAuthStateChanged).toHaveBeenCalled();
  });

  test('incorrect login should return false', async () => {
    setMockObject('signInSuccess', false);

    const authentication = getAuthAndCheckConsole();
    const data = await authentication.login();
    expect(data).toBeFalsy();
    expect(console.error).toHaveBeenCalled();
    expect(Firebase.auth().onAuthStateChanged).toHaveBeenCalled();
  });

  test('correct logout should return true', async () => {
    setMockObject('signOutSuccess', true);

    const authentication = getAuthAndCheckConsole();
    const data = await authentication.logout();
    expect(data).toBeTruthy();
    expect(console.error).not.toHaveBeenCalled();
    expect(Firebase.auth().onAuthStateChanged).toHaveBeenCalled();
  });

  test('incorrect logout should return false', async () => {
    setMockObject('signOutSuccess', false);

    const authentication = getAuthAndCheckConsole();
    const data = await authentication.logout();
    expect(data).toBeFalsy();
    expect(console.error).toHaveBeenCalled();
    expect(Firebase.auth().onAuthStateChanged).toHaveBeenCalled();
  });
});
