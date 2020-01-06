import 'jest';

import Encrypting from './encrypting';
import Heplers from './helpers';

describe('encrypting test', () => {
  test('Normal message should be encrypted', () => {
    const testCases = 5;

    for (let t = 0; t < testCases; t++) {
      const message = Heplers.randomString(3000);
      const pwd = Heplers.randomString(27);

      const crypting = new Encrypting();
      const encMessage = crypting.encrypt(message, pwd);
      const decMessage = crypting.decrypt(encMessage, pwd);

      expect(decMessage).toBe(message);
    }
  });

  test('Error on decrypting should throw error', () => {
    const message = Heplers.randomString(3000);
    const pwd = Heplers.randomString(27);

    const crypting = new Encrypting();
    expect(() => { crypting.decrypt(message, pwd); }).toThrowError();
  });
});
