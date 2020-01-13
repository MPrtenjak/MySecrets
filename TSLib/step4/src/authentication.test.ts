import Authentication from './authentication'
import * as Firebase from 'firebase/app';

interface IFirebase {
  __testResult: Boolean,
  auth: Function,
}

function getSettings(): ISettings {
  return {
    firebaseConfig: {},
    firebaseRoot: 'root',
    languageCode: 'si',
    onAuthChange(user) {}
  }
}

describe('testing authentication', () => {
  test('correct login should return true', () => {
    const settings = getSettings();
    const authentication = new Authentication(settings);

    const mockedFirebase = Firebase as jest.Mock<IFirebase>;
    mockedFirebase.__testResult = true;
    return authentication.login()
      .then(data => {
        expect(data).toBeTruthy();
      })
  });

  test('incorrect login should return false', () => {
    const settings = getSettings();
    const authentication = new Authentication(settings);

    // Firebase.__testResult = false;
    return authentication.login()
      .then(data => {
        expect(data).toBeFalsy();
      })
  });

  test('correct logout should return true', () => {
    const settings = getSettings();
    const authentication = new Authentication(settings);

    return authentication.logout()
      .then(data => {
        expect(data).toBeTruthy();
      })
  });
})
