class GoogleAuthProvider
{
}

var testResult = true;

function auth() {
  return {
    onAuthStateChanged: () => {},

    signInWithPopup: () => {
      return Promise.resolve(testResult);
    },

    signOut: () => {
      return Promise.resolve(testResult);
    },
  }
}

auth.GoogleAuthProvider = () => {};

const Firebase = {
  __testResult: testResult,

  auth
}

module.exports = Firebase;
