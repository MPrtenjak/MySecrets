class GoogleAuthProvider {
}

let testResult = true;

function auth() {
  return {
    onAuthStateChanged: () => { return; },

    signInWithPopup: () => {
      return Promise.resolve(testResult);
    },

    signOut: () => {
      return Promise.resolve(testResult);
    },
  };
}

auth.GoogleAuthProvider = () => { return; };

const Firebase = {
  __testResult: testResult,
  auth,
};

module.exports = Firebase;
