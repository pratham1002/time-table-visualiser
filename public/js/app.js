const signUpForm = document.querySelector("#signUpForm");
    
    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const signUpUsername = document.getElementById("signUpUsername").value;
        const signUpPassword = document.getElementById("signUpPassword").value;

        async function postData(url = "", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json"
         // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
        return await response.json(); // parses JSON response into native JavaScript objects
    }

        postData("http://127.0.0.1:3000/users", { username: signUpUsername, password: signUpPassword })
        .then((data) => {
        console.log(data); // JSON data parsed by `response.json()` call
    });
    });