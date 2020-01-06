import 'jest';

import EncryptingAppData from './encrypting-app-data';
import Heplers from './helpers';

function generateFakeWebpageData(): IWebPageData {
  return {
    webPage: Heplers.randomString(30),
    userName: Heplers.randomString(20),
    password: Heplers.randomString(20),
    notes: Heplers.randomString(5000),
  };
}

function generateFakeItem(numPages: number = 0, numBins: number = 0): IAppData {
  const pages = [];
  for (let p = 0; p < numPages; ++p) {
    pages.push(generateFakeWebpageData());
  }

  const trash = [];
  for (let b = 0; b < numBins; ++b) {
    trash.push(generateFakeWebpageData());
  }

  return {
    pages,
    trash,
  };
}

describe('crypting items test', () => {
  test('empty message be encrypted', () => {
    const password = Heplers.randomString(50);

    const encrypting = new EncryptingAppData();
    const fakeItem = generateFakeItem();
    const encrypted = encrypting.encrypt(fakeItem, password);
    const decrypted = encrypting.decrypt(encrypted, password);
    expect(fakeItem).toEqual(decrypted);
  });

  test('different messages should encrypted', () => {
    const testCases = 5;

    for (let t = 0; t < testCases; t++) {
      const password = Heplers.randomString(50);

      const encrypting = new EncryptingAppData();
      const fakeItem = generateFakeItem(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));
      const encrypted = encrypting.encrypt(fakeItem, password);
      const decrypted = encrypting.decrypt(encrypted, password);
      expect(fakeItem).toEqual(decrypted);
    }
  });

  test('wrong password should not decrypt items', () => {
    const testCases = 5;

    for (let t = 0; t < testCases; t++) {
      const password = Heplers.randomString(50);
      const wrongPassword = Heplers.randomString(50);

      const encrypting = new EncryptingAppData();
      const fakeItem = generateFakeItem(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));
      const encrypted = encrypting.encrypt(fakeItem, password);
      expect(() => { encrypting.decrypt(encrypted, wrongPassword); }).toThrowError();
    }
  });
});
