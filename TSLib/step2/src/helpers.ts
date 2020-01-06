function randomCharacter(): string {
  const chars = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
  return chars.substr( Math.floor(Math.random() * 62), 1);
}

export default class Helpers {
  public static randomString(size: number): string {
    let str = '';

    for (let i = 0; i < size; i++) {
        str += randomCharacter();
    }

    return str;
  }
}
