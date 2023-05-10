console.log('connecté !');

//I. Afficher le nombre de charactères entrés dans le textArea par rapport à la limite

const textArea = document.querySelector('textarea');
console.log(textArea);

const textLimit = textArea.getAttribute('maxlength');
console.log(textLimit);

const placeTextLimit = document.querySelector('.lengthChecker');
console.log(placeTextLimit)

textArea.addEventListener('input',() => {
    const describedIssue = textArea.value;
    console.log(describedIssue);
    const lengthOfDescribedIssue = describedIssue.length;
    console.log(lengthOfDescribedIssue);
    placeTextLimit.innerHTML = 
    `
    ${lengthOfDescribedIssue} / ${textLimit}
    `
})

//II. récupérer les données entrées dans le formulaire, les mettre dans le localStorage puis afficher l'état de la requête en dessous

const form = document.querySelector('#myForm');
console.log(form);

const problem = document.querySelector('#problem');
console.log(problem)

const severity = document.querySelector('#severity-select');
console.log(severity)

const category = document.querySelector('#category-select');
console.log(category)

const describe = document.querySelector('#describe');
console.log(describe)

const email = document.querySelector('#contact');
console.log(email)

let idValue = Math.floor(Math.random() * 1000);

let issue;//déclare dans le scope global pour pouvoir y accéder dans la fonction insert() et dans l'eventListener

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const problemValue = problem.value;
  console.log(problemValue)
  const severityValue = severity.value;
  console.log(severityValue)
  const categoryValue = category.value;
  console.log(categoryValue)
  const describeValue = describe.value;
  console.log(describeValue)
  const emailValue = email.value.trim();
  console.log(emailValue)


  issue = {
    problem: problemValue,
    severity: severityValue,
    category: categoryValue,
    describe: describeValue,
    email: emailValue,
    id: idValue,
    status: 'OPEN'
  }
  console.log(issue)

  localStorage.setItem('issue', JSON.stringify(issue));//obligé de mettre en JSON string pour enregistrer un objet dans le localStorage

  insert(changeStatus);
});

const response = document.getElementById('response')
console.log(response)

function insert(changeStatus) {//changeStatus en callback to run btnClosed.addEventListener after the user has submitted the form
  const storedData = JSON.parse(localStorage.getItem('issue'));//parse to convert the JSON string back to a JavaScript object
  console.log(storedData);

  

    response.innerHTML = 
    ` 
      <div class="response-added-notif">
        <i class="ph-fill ph-check-circle"></i>Your issue has been added
      </div>
      <div class="response-id">
        <i class="ph-fill ph-bookmark-simple"></i>
        Issue tracking number : <b>${storedData.id}</b>
      </div>
      <div class="response-status">
        <span class="status">${storedData.status}</span>
      </div>
      <div class="response-details">
        <h2>Details of your issue</h2>
        <p>Title : "${storedData.problem}"</p>
        <p class="response-details-category">Category : 
          <span class='category'>
            <i class="ph-fill ph-hash"></i>${storedData.category}
          </span>
        </p>
        <p class="response-details-category">Severity : 
          <span class='severity'>
          <i class="ph-fill ph-flag"></i>${storedData.severity}
          </span>
        </p>
        <p>Details : "${storedData.describe}"</p>
      </div>
      <div class="closer">
        <button id="close-btn" class="myBtn">Close issue</button>
      </div>
    `
    response.classList.add('active')
    changeStatus()
}

//III. Ajouter le statut du traitement de l'Issue et permettre à l'utilisateur de mettre en statut "closed"

function changeStatus() {
  const btnClosed = document.querySelector('.myBtn');
  console.log(btnClosed);
  btnClosed.addEventListener('click', () => {
    console.log('bouton cliqué');
    const storedData = JSON.parse(localStorage.getItem('issue'));//PARSE and Get to go get the JSON string and put it in the JS object format

    if (storedData.id == idValue){
      storedData.status = "CLOSED";
      localStorage.setItem('issue', JSON.stringify(storedData));//renvoie en local storage avec le storedData.status mis à jour
      insert(changeStatus)
    }
});
}


