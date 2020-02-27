const mock = {
  signInSuccess: true,
  signOutSuccess: true,

  getPromise(success: boolean): Promise<any> {
    return (success)
      ? Promise.resolve(null)
      : Promise.reject('error')
  },

  onAuthStateChanged: () => { },

  signInWithPopup: function () {
    return this.getPromise(this.signInSuccess)
  },

  signOut: function () {
    return this.getPromise(this.signOutSuccess)
  },
}

function auth() {
  return mock
}

auth.GoogleAuthProvider = () => { return; };

module.exports = {
  auth,
};
