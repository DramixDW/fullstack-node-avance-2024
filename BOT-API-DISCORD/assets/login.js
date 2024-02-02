const form = document.querySelector("form");

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const data = new FormData(this);
    const username = data.get('username');
    const password = data.get('password');

    console.log(username, password);

    await fetch("http://localhost:8081/users/login", {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
});