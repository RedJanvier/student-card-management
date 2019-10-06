const login_form = document.querySelector('form.login');
const msg_box = document.querySelector('.msg_box');

const disp_error = (msg) => {
    msg_box.innerHTML = `<p class='error'>${msg}</p>`;
    msg_box.style.display = 'block';
    setTimeout(() => {
        msg_box.style.display = 'none';
    }, 3000);
}

login_form.addEventListener('submit', e => {
    e.preventDefault();

    const email = login_form.email.value;
    const password = login_form.password.value;

    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
        // location.href = '/student-card-management/management.html';
        location.href = '/management.html';
    })
    .catch(err => {
        const errorMessage = err.message;
        disp_error(errorMessage);
    });
});



