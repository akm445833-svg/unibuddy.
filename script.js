function openLogin() {
    document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}


function login() {

    const name =
        document.getElementById("studentName").value;

    const email =
        document.getElementById("studentEmail").value;

    const message =
        document.getElementById("loginMessage");


    if (name === "" || email === "") {

        message.innerText =
            "Please enter your name and email.";

        message.style.color = "red";

        return;
    }


    message.innerText =
        "Welcome to UniBuddy, " + name + "! 🎉";

    message.style.color = "#5b4ff5";


    setTimeout(() => {

        closeLogin();

    }, 1800);
}


window.onclick = function(event) {

    const modal =
        document.getElementById("loginModal");

    if (event.target === modal) {

        closeLogin();

    }

};
