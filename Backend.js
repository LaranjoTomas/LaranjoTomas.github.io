// Function to load the database
function loadDatabase(callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var database = JSON.parse(xmlhttp.responseText);
            callback(database);
        }
    };
    xmlhttp.open("GET", "database.json", true);
    xmlhttp.send();
}

// Global variable to hold the database
var database;

// Load the database
loadDatabase(function(data) {
    database = data;
});

function signUp(username, email, password) {
    var newUser = { username: username, email: email, password: password };
    database.users.push(newUser);
    saveDatabase();
}

function login(username, password) {
    var user = database.users.find(function(user) {
        return user.username === username && user.password === password;
    });
    return user;
}

function saveDatabase() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "save-database.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(database));
}

function handleLogin(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission

        var username = document.getElementById("username-input").value;
        var password = document.getElementById("password-input").value;

        var user = login(username, password);
        if (user) {
            console.log("Login successful!");
            // Perform actions for successful login (e.g., redirect to a new page)
            window.location.href = "another-page.html"; // Replace "another-page.html" with the desired destination page
        } else {
            console.log("Invalid username or password.");
            alert("Invalid username or password."); // Display an error message
        }
    }
}