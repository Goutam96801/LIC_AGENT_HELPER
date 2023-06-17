let ul = document.querySelector('.links-container');
const navbar = document.querySelector('.navbar');
const toggleBtn = document.querySelector('.toggle-btn');


toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    ul.classList.toggle('show');
})

auth.onAuthStateChanged((user) => {
    if (user) {
        ul.innerHTML += `<li class="link-item">
        <a href="/admin" class="link">Dashboard</a> </li>
        <li class="link-item">
        <a href="#" onClick = "logoutUser()" class="link">Logout</a>
        </li>
    `
    } else {

        ul.innerHTML += `
        <li class="link-item">
                    <a href="/admin" class="link">Login</a>
                </li>
        `
    }
})