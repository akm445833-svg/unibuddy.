const API_URL = "https://unibuddy-hm8g.onrender.com";


// ================= BACKEND TEST =================

fetch(`${API_URL}/api/health`)
    .then(response => response.json())
    .then(data => {
        console.log("UniBuddy Backend:", data);
    })
    .catch(error => {
        console.error("Backend connection failed:", error);
    });


// ================= LOGIN MODAL =================

function openLogin() {
    document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}


// ================= LOGIN =================

async function login() {

    const name =
        document.getElementById("studentName").value.trim();

    const email =
        document.getElementById("studentEmail").value.trim();

    const message =
        document.getElementById("loginMessage");


    if (name === "" || email === "") {

        message.innerText =
            "Please enter your name and email.";

        message.style.color = "red";

        return;
    }


    // Demo password until password field is added
    const password = "UniBuddy123";


    try {

        const response = await fetch(
            `${API_URL}/api/auth/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        const data = await response.json();


        if (data.success) {

            localStorage.setItem(
                "unibuddyToken",
                data.token
            );

            localStorage.setItem(
                "unibuddyUser",
                JSON.stringify(data.user)
            );


            message.innerText =
                `Welcome back, ${data.user.name}! 🎉`;

            message.style.color = "#5b4ff5";


        } else {

            message.innerText =
                data.message || "Login failed.";

            message.style.color = "red";

        }


    } catch (error) {

        console.error(error);

        message.innerText =
            "Backend se connection nahi ho raha.";

        message.style.color = "red";

    }

}


// ================= SIGNUP =================

async function signup(
    name,
    email,
    password,
    college
)const result = await signup(
    name,
    email,
    password,
    college
); {

    try {

       const result = await Promise.race([
    signup(name, email, password, college),
await fetch(`${API_URL}/api/health`);
    new Promise(resolve =>
        setTimeout(() => {
            resolve({
                success: false,
                message: "Server wake ho raha hai. Please 20-30 seconds baad dobara try karein."
            });
        }, 15000)
    )
]); 
                        college ||
                        "Bansal Institute of Engineering and Technology"

                })
            }
        );


        const data = await response.json();


        console.log(
            "Signup Response:",
            data
        );


        return data;


    } catch (error) {

        console.error(
            "Signup Error:",
            error
        );


        return {
            success: false,
            message: "Server connection failed."
        };

    }

}


// ================= CREATE COMMUNITY POST =================

async function createPost(
    title,
    content,
    category,
    author
) {

    try {

        const response = await fetch(
            `${API_URL}/api/posts`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    title: title,

                    content: content,

                    category:
                        category || "Community",

                    author: author

                })
            }
        );


        const data =
            await response.json();


        console.log(
            "Post Response:",
            data
        );


        return data;


    } catch (error) {

        console.error(
            "Post Error:",
            error
        );


        return {
            success: false,
            message: "Unable to connect to server."
        };

    }

}


// ================= GET COMMUNITY POSTS =================

async function getPosts() {

    try {

        const response =
            await fetch(
                `${API_URL}/api/posts`
            );


        const data =
            await response.json();


        console.log(
            "Community Posts:",
            data
        );


        return data.posts || [];


    } catch (error) {

        console.error(
            "Get Posts Error:",
            error
        );


        return [];

    }

}


// ================= CLOSE MODAL =================

window.onclick = function(event) {

    const modal =
        document.getElementById("loginModal");


    if (event.target === modal) {

        closeLogin();

    }

};
// ================= REAL SIGNUP =================

async function handleSignup() {

    const name =
        document.getElementById("studentName").value.trim();

    const email =
        document.getElementById("studentEmail").value.trim();

    const password =
        document.getElementById("studentPassword").value;

    const college =
        document.getElementById("studentCollege").value.trim();

    const message =
        document.getElementById("loginMessage");


    if (!name || !email || !password) {

        message.innerText =
            "Please fill all required fields.";

        message.style.color = "red";

        return;
    }


    if (password.length < 6) {

        message.innerText =
            "Password must contain at least 6 characters.";

        message.style.color = "red";

        return;
    }


    message.innerText =
        "Creating your account...";

    message.style.color = "#5b4ff5";


    const result = await signup(
        name,
        email,
        password,
        college
    );


    if (result.success) {

        localStorage.setItem(
            "unibuddyToken",
            result.token
        );

        localStorage.setItem(
            "unibuddyUser",
            JSON.stringify(result.user)
        );


        message.innerText =
            "Account created successfully! 🎉";

        message.style.color = "green";


        setTimeout(() => {

            closeLogin();

        }, 1500);


    } else {

        message.innerText =
            result.message || "Signup failed.";

        message.style.color = "red";

    }

}


// ================= SHOW LOGIN =================

function showLogin() {

    document.getElementById("authTitle").innerText =
        "Welcome Back 👋";

    document.getElementById("authSubtitle").innerText =
        "Login to your UniBuddy account";


    document.querySelector(".login-button").innerText =
        "Login 🚀";


    document.querySelector(".login-button").onclick =
        handleRealLogin;

}


// ================= REAL LOGIN =================

async function handleRealLogin() {

    const email =
        document.getElementById("studentEmail").value.trim();

    const password =
        document.getElementById("studentPassword").value;

    const message =
        document.getElementById("loginMessage");


    if (!email || !password) {

        message.innerText =
            "Enter email and password.";

        message.style.color = "red";

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/api/auth/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );


        const data =
            await response.json();


        if (data.success) {

            localStorage.setItem(
                "unibuddyToken",
                data.token
            );

            localStorage.setItem(
                "unibuddyUser",
                JSON.stringify(data.user)
            );


            message.innerText =
                `Welcome back, ${data.user.name}! 🎉`;

            message.style.color = "green";


            setTimeout(() => {

                closeLogin();

            }, 1500);


        } else {

            message.innerText =
                data.message || "Login failed.";

            message.style.color = "red";

        }


    } catch (error) {

        console.error(error);

        message.innerText =
            "Unable to connect to UniBuddy server.";

        message.style.color = "red";

    }

}
