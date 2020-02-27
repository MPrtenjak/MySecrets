const mock = {
  signInSuccess: true,
  signOutSuccess: true,

  onAuthStateChanged: () => { },

  signInWithPopup: function () {
    return (this.signInSuccess)
      ? Promise.resolve(null)
      : Promise.reject('error')
  },

  signOut: function () {
    return (this.signOutSuccess)
      ? Promise.resolve(null)
      : Promise.reject('error')
  },
}

function auth() {
  return mock
}

auth.GoogleAuthProvider = () => { return; };

module.exports = {
  auth,
};
