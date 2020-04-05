const id = location.href.split('?id=')[1];
const output_box = document.querySelector('.output');

const display_school = (s) => {
  let school;
  switch (s) {
    case 'sci':
      school = 'science';
      break;
    case 'eng':
      school = 'engineering';
      break;
    case 'arch':
      school = 'architecture';
      break;
    case 'cs':
      school = 'computer science';
      break;
    default:
      school = 'school unkown';
  }
  return `${school}`;
};

const display_program = (p) => {
  let program;
  switch (p) {
    case 'ete':
      program = 'Electronics & Telecommunication Eng.';
      break;
    case 'cve':
      program = 'Civil Eng.';
      break;
    case 'cse':
      program = 'Computer Science Eng.';
      break;
    case 'mce':
      program = 'Mechanical Eng.';
      break;
    default:
      program = 'program unkown';
  }
  return `${program}`;
};

const display_year = (y) => {
  let year;
  switch (y) {
    case 'y1':
      year = 'Year 1';
      break;
    case 'y2':
      year = 'Year 2';
      break;
    case 'y3':
      year = 'Year 3';
      break;
    case 'y4':
      year = 'Year 4';
      break;
    default:
      year = 'Year unkown';
  }
  return `${year}`;
};

const display_card = ({
  firstname,
  lastname,
  reg_number,
  image,
  program,
  school,
  year,
  created_at,
}) => {
  const html = `
        <div class="student-card">
            <p class="image"> <img src=${image} alt="profile" /> </p>
            <div class="card-content">
                <p class="name"><b>Name:</b> ${firstname} ${lastname}</p>
                <p class="school"><b>School Name:</b> ${display_school(
                  school
                )}</p>
                <p class="school"><b>Program:</b> ${display_program(
                  program
                )}</p>
                <p><b>Study Year:</b> ${display_year(year)}</p>
                <p><b>Registration number:</b> ${reg_number}</p>
            </div>
        </div>
    `;
  return html;
};

if (JSON.parse(localStorage.getItem('cards'))) {
  const cards = JSON.parse(localStorage.getItem('cards'));
  const data = cards.filter((card) => card.reg_number === id)[0];
  output_box.innerHTML = display_card(data);
} else {
  db.collection('student-cards')
    .where('reg_number', '=', id)
    .get()
    .then((snaps) => {
      const data = snaps[0].data();
      output_box.innerHTML = display_card(data);
    })
    .catch(console.log);
}
