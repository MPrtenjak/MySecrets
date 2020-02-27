const mock = {
  signInSuccess: true,
  signOutSuccess: true,

  getPromise(success: boolean): Promise<any> {
    return (success)
      ? Promise.resolve(null)
      : Promise.reject('error');
  },

  onAuthStateChanged: () => {
    return;
  },

  signInWithPopup() {
    return this.getPromise(this.signInSuccess);
  },

  signOut() {
    return this.getPromise(this.signOutSuccess);
  },
};

function auth() {
  return mock;
}

auth.GoogleAuthProvider = () => { return; };

module.exports = {
  auth,
};
