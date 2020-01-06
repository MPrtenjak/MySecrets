import 'jest';

import Encrypting from './Encrypting';

describe('encrypting test', () => {
  test('basic test', () => {
    const plainText = 'thi is some text';
    const password = 'this is password';

    const encrypting = new Encrypting();

    const encryptedText = encrypting.encrypt(plainText, password)
    const result = encrypting.decrypt(encryptedText, password);

    expect(result).toBe(plainText);
  });
});
