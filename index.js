// const firebaseConfig = {
//     apiKey: "AIzaSyCdzpFqcbPr1OJEV_8RwMSYfGacGP2h5So",
//     authDomain: "nrichlearning-form-app-e6a45.firebaseapp.com",
//     databaseURL:
//         "https://nrichlearning-form-app-e6a45-default-rtdb.firebaseio.com",
//     projectId: "nrichlearning-form-app-e6a45",
//     storageBucket: "nrichlearning-form-app-e6a45.appspot.com",
//     messagingSenderId: "899181737051",
//     appId: "1:899181737051:web:5f6ab9d7bd9e3af342fb7e",
// };

// firebase.initializeApp(firebaseConfig);

// const db = firebase.database().ref("userForm");

document.getElementById("submit-form").addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("hello");

    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let message = document.querySelector("#message").value;

    alert("Your information has been submitted");
});

document.getElementById("update").addEventListener("click", (e) => {
    const card = e.target.parentNode;
    const h3 = card.querySelectorAll("h3");
    let name = h3[0].querySelector("span").innerText;
    let email = h3[1].querySelector("span").innerText;
    let message = card.querySelector("p").querySelector("span").innerText;
    console.log(name, email, message);

    document.getElementById("name1").value = name
    document.getElementById("email1").value = email
    document.getElementById("message1").value = message

    document.querySelector(".update-container").classList.add("active")
});

document.getElementById("cross").addEventListener("click", () => {
    document.querySelector(".update-container").classList.remove("active")
});

document.getElementById("update-form").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("hello");
    alert("User updated successfully");
    document.querySelector(".update-container").classList.remove("active")
})
