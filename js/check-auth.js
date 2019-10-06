const logout_btn = document.querySelector('.logout');

logout_btn.addEventListener('click', e => {
    firebase.auth().signOut();
    // location.href = '/student-card-management/management-login.html';
    location.href = '/management-login.html';
});
// firebase.firestore().collection('student-cards')
// .get()
// .orderBy('created_at')
// .then(cards => {
//     console.log(cards);
//     localStorage.setItem(JSON.stringify(cards));
// })
// .catch(console.log);