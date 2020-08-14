import firebase from 'firebase';

class Fire {
    constructor() {
      this.init();
    }
  
    init = () => {
      if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyAcAUuF7WvzBlSKK3Ss2OdatabaseIXEpQCIB7LY",
            authDomain: "lab7-3b873.firebaseapp.com",
            databaseURL: "https://lab7-3b873.firebaseio.com",
            projectId: "lab7-3b873",
            storageBucket: "lab7-3b873.appspot.com",
            messagingSenderId: "723924071357",
            appId: "1:723924071357:web:ead618d93bcfa4733698d4",
            measurementId: "G-XQ70K9SXHV"
        });
      }
    };
  
    get ref() {
      return firebase.database().ref('messages');
    }
  
    parse = snapshot => {
      const { text, user } = snapshot.val();
      const { key: _id } = snapshot;
      const createdAt = new Date();
      const message = {
        _id,
        createdAt,
        text,
        user,
      };
      return message;
    };
  
    on = callback =>
      this.ref
        .limitToLast(20)
        .on('child_added', snapshot => callback(this.parse(snapshot)));

    send = messages => {
      for (let i = 0; i < messages.length; i++) {
        const { text, user } = messages[i];
        const message = {
          text,
          user,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        };
        this.ref.push(message);
      }
    };
  
    off() {
      this.ref.off();
    }
  }
  
  Fire.shared = new Fire();
  export default Fire;