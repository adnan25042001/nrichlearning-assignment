const firebaseConfig = {
    apiKey: "AIzaSyCdzpFqcbPr1OJEV_8RwMSYfGacGP2h5So",
    authDomain: "nrichlearning-form-app-e6a45.firebaseapp.com",
    databaseURL:
        "https://nrichlearning-form-app-e6a45-default-rtdb.firebaseio.com",
    projectId: "nrichlearning-form-app-e6a45",
    storageBucket: "nrichlearning-form-app-e6a45.appspot.com",
    messagingSenderId: "899181737051",
    appId: "1:899181737051:web:5f6ab9d7bd9e3af342fb7e",
};

firebase.initializeApp(firebaseConfig);

let db = firebase.database().ref("user-data");

let cards = document.querySelector(".cards");

// Appends all user data to home page
const appendData = (data) => {
    cards.innerHTML = null;
    for (let key in data) {
        let card = document.createElement("div");
        card.setAttribute("class", "card");

        let name = document.createElement("h3");
        let s1 = document.createElement("span");
        s1.innerText = data[key].name;
        name.innerText = "Name: ";
        name.append(s1);

        let email = document.createElement("h3");
        let s2 = document.createElement("span");
        s2.innerText = data[key].email;
        email.innerText = "Email: ";
        email.append(s2);

        let message = document.createElement("p");
        let s3 = document.createElement("span");
        s3.innerText = data[key].message;
        message.innerText = "Message: ";
        message.append(s3);

        let div = document.createElement("div");

        let updateButton = document.createElement("button");
        updateButton.setAttribute("id", "update");
        updateButton.innerText = "Update";
        updateButton.addEventListener("click", () => {
            showUpdateForm(
                key,
                data[key].name,
                data[key].email,
                data[key].message
            );
        });

        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("id", "delete");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteUser(key);
        });

        div.append(updateButton, deleteButton);
        card.append(name, email, message, div);
        cards.append(card);
    }
};

// Gettin all the user values from firebase realtime database
db.on("value", (snap) => {
    let data = snap.val();
    appendData(data);
});

// Adding event listener to submit form
document.getElementById("submit-form").addEventListener("submit", (e) => {
    e.preventDefault();

    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let message = document.querySelector("#message").value;

    // Call savedata function to save the current user
    saveData(name, email, message);

    alert("Your information has been submitted");
});

// Event listener for update button for every user
const showUpdateForm = (id, name, email, message) => {
    let updateForm = document.getElementById("update-form");
    updateForm.setAttribute("class", id);
    document.getElementById("name1").value = name;
    document.getElementById("email1").value = email;
    document.getElementById("message1").value = message;

    document.querySelector(".update-container").classList.add("active");
};

// Event listener for close button
document.getElementById("cross").addEventListener("click", () => {
    document.querySelector(".update-container").classList.remove("active");
});

// Event listener for update form submission
document.getElementById("update-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const id = e.target.classList.value;
    const name = document.getElementById("name1").value;
    const email = document.getElementById("email1").value;
    const message = document.getElementById("message1").value;

    let update = {
        name,
        email,
        message,
    };

    firebase
        .database()
        .ref("user-data/" + id)
        .update(update);

    alert("User updated successfully");
    document.querySelector(".update-container").classList.remove("active");
});

// function to delete user from database
const deleteUser = (id) => {
    firebase
        .database()
        .ref("user-data/" + id)
        .remove();

    alert("User deleted successfully");
};

// Save data to the database
const saveData = (name, email, message) => {
    let data = db.push();

    data.set({
        name,
        email,
        message,
    });
};
