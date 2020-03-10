const signUpForm = document.querySelector("#signUpForm");
// const signUpUsername = document.querySelector("#signUpUsername");
// const signUpPassword = document.querySelector("#signUpPassword");

signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    postData("http://localhost:3000/users", { username: "prg", password: "1234" })
  .then((data) => {
    console.log(data); // JSON data parsed by `response.json()` call
  });
});

// Example POST method implementation:
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
    body: data // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}