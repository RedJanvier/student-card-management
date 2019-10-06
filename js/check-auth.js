const logout_btn = document.querySelector('.logout');

logout_btn.addEventListener('click', e => {
    firebase.auth().signOut();
    location.href = '/student-card-management/management-login.html';
});

// db.collection('student-cards')
// .get()
// .orderBy('created_at')
// .then(cards => {
//     const list = cards.data();
// })
// .catch(console.log);