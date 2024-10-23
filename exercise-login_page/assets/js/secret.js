document.getElementById('put__form').addEventListener('submit', async(e) => {

    e.preventDefault();

    const id = document .getElementById('id_update').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;



    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    })

    if (response.ok) {

        alert('OK')

    } else {
        alert('Failed')

    }

});



document.getElementById('delete__form').addEventListener('submit', async(e) => {

    e.preventDefault();

    const id = document.getElementById('id_delete').value;

    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id})
    })

    if (response.ok) {

        alert('OK')
    } else [
        alert('Failed')
    ]


})


