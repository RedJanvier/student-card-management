const logout_btn = document.querySelector('.logout');
const cards_list = document.querySelector('.cards-list');

console.log('[check-auth.js] working...', );
logout_btn.addEventListener('click', e => {
    firebase.auth().signOut();
    // location.href = '/student-card-management/management-login.html';
    location.href = '/management-login.html';
});

db.collection('student-cards')
.get()
.then(snaps => {
    let html;
    snaps.forEach(snap => {
        const card = snap.data();
        html = html + `
            <tr class = "student-card">
                <th> ${card.reg_number} </th>
                <td> ${card.firstname} ${card.lastname} </td>
                <td> ${card.created_at} </td>
            </tr>
        `;
    });
    cards_list.innerHTML = html;
})
.catch(console.log);