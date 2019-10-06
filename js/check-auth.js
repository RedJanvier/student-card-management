const logout_btn = document.querySelector('.logout');
const cards_list = document.querySelector('.cards-list');

const delete_card = number => {
    console.log(number);
}

console.log('[check-auth.js] working...', );
logout_btn.addEventListener('click', e => {
    firebase.auth().signOut();
    location.href = '/student-card-management/management-login.html';
    // location.href = '/management-login.html';
});

db.collection('student-cards')
.onSnapshot(snaps => {
    let html;
    const cards = [];
    snaps.forEach(snap => {
        const card = snap.data();
        cards.push(card);
        html = html + `
            <tr class = "student-card">
                <th> ${card.reg_number} </th>
                <td> <a href="/student-card-management/personal.html?id=${card.reg_number}">${card.firstname} ${card.lastname}</a> </td>
                <td> ${card.created_at} </td>
                <!-- <td> <i class = "fa fa-trash-o text-danger" onClick = "() => delete_card(${card})" > </i> </td> -->
            </tr>
        `;
    });
    localStorage.setItem('cards', JSON.stringify(cards));
    cards_list.innerHTML = html;
})
.catch(console.log);