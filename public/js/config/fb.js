const firebaseConfig = {
    apiKey: 'AIzaSyBet1oDErX9hqnbETjtFeDskzCJmg-g4F0',
    authDomain: 'redjanvier.firebaseapp.com',
    databaseURL: 'https://redjanvier.firebaseio.com',
    projectId: 'redjanvier',
    storageBucket: 'redjanvier.appspot.com',
    messagingSenderId: '882664770377',
    appId: '1:882664770377:web:e87a703106c8ba5e13a898',
    measurementId: 'G-RXY7RHN7TG'
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

// auth.onAuthStateChange(user => {
//     if (user) {
//         location.href = '/student-card-management/management.html';
//     } else {
//         location.href = '/student-card-management/management-login.html';
//     }
// });