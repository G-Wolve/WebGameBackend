const overlay = document.getElementById('overlay');
const loginButton = document.getElementById('loginBtn');
const accountNameElement = document.getElementById('accountName');
const loginForm = document.getElementById('loginForm');
const baseUrl = 'http://127.0.0.1:6969/';
var token;


function toggleForm(){
    overlay.classList.toggle('show');
    document.body.classList.toggle('wrapper-open');
}

function toggleProfile(){
    loginButton.classList.toggle('show');
    accountNameElement.classList.toggle('show');
}

loginButton.addEventListener('click', () => {
    toggleForm();
});



loginForm.addEventListener('submit', logIn);

async function logIn(e){
    e.preventDefault();
    const formData = new FormData(loginForm);
  
    // Create an object from the FormData to convert it to JSON
    const data = {};
    for (let [name, value] of formData) {
    data[name] = value;
    };
    console.log(data);

    const res = await fetch(baseUrl + 'api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    const resdata = await res.json()
    console.log(resdata);

    token = resdata.token;
    accountNameElement.textContent = resdata.playername;
    
    toggleProfile();
    toggleForm();
}


