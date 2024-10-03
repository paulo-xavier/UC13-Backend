document.getElementById('register__form').addEventListener('submit', async(e) => {

    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log(name)
    console.log(email)
    console.log(username)
    console.log(password)


    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, username, password })
    });

    // const messageElement = document.getElementById('message');

    if (response.ok){

        window.location.href = '../../login.html';

    } else {
        const errorMessage = await response.text();

        alert('invalid'); 

    }



})