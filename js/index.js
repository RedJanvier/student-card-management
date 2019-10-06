const form = document.querySelector('form');
const loader = document.querySelector('.loader');
const hide = (md) => {
    loader.style.display = 'none';
    setTimeout(() => {
        md.style.display = 'none';
    }, 2000);
}
form.addEventListener('submit', e => {
    e.preventDefault();

    const modal = document.querySelector('.modal-wrapper');
    modal.style.display = 'block';
    scrollTo(0,0);

    const output = document.querySelector('.upload > .output');
    const fname = form.firstname.value;
    const lname = form.lastname.value;
    const gender = form.gender.value;
    const regnumber = form.reg_number.value;
    const file = form.profile.files[0];
    const school = form.school.value;
    const program = form.program.value;
    const year = form.year.value;

    const uploadTask = storage.ref().child('students-profiles/' + file.name).put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        output.textContent = 'Upload is ' + progress.toFixed(2) + '% done';
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, error => {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/unauthorized':
                output.textContent = 'You are not allowed';
                hide(modal);
                break;

            case 'storage/canceled':
                output.textContent = 'Upload was canceled';
                hide(modal);
                break;

            case 'storage/unknown':
                output.textContent = 'Unkown Error! Please try again';
                hide(modal);
                setTimeout(() => {
                    window.location.reload();
                },2000);
            break;
        }
    }, () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
            const newCard = {
                created_at: new Date(),
                firstname: fname,
                lastname: lname,
                image: url,
                program,
                school,
                gender,
                year,
                reg_number: regnumber
            }
            db.collection('student-cards')
            .add(newCard)
            .then(docRef => {
                form.reset();
                loader.style.display = 'none';

                output.textContent = `✔Done Uploading✔ Thank you for your contributions.`;

                setTimeout(() => {
                    location.reload();
                }, 6000);
            })
            .catch(err => output.textContent = `error occurred ${err}`);
        });
    });


});