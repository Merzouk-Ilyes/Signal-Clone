import * as firebase from "firebase"
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBm5zYdgzUMRnvp2QZSPRzR0FSXsk6HGqQ",
    authDomain: "signal-clone-9bca5.firebaseapp.com",
    projectId: "signal-clone-9bca5",
    storageBucket: "signal-clone-9bca5.appspot.com",
    messagingSenderId: "845187121723",
    appId: "1:845187121723:web:d62cad2962015de268121e"
  };

  let app ;

  if(firebase.apps.length === 0) {
    app = firebase.initializeApp (firebaseConfig);
  }else {
    app =firebase.app()
  }

  const db = app.firestore()
  const auth = firebase.auth()

  export {db, auth}