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

function loadSearchData() {
    const games = [
        { name: "Polar Regions", icon: "../IPhone14PRO-3/img/artic.png", href: "../IPhone14PRO-13/i-phone1-pro13.html" },
        { name: "Artic Monkeys", icon: "../IPhone14PRO-3/img/arctic.png", href: "../IPhone14PRO-4/i-phone1-pro4.html" },
        { name: "Departure", icon: "../IPhone14PRO-3/img/bug.png", href: "../IPhone14PRO-14/i-phone1-pro14.html" },
        { name: "Guns n' Roses", icon: "../IPhone14PRO-3/img/guns&roses.png", href: "../IPhone14PRO-16/i-phone1-pro16.html" },
        { name: "Shake the Shudder", icon: "../IPhone14PRO-3/img/chkchkchk.png", href: "../IPhone14PRO-15/i-phone1-pro15.html" },
        { name: "Adolescents", icon: "../IPhone14PRO-3/img/idk.png", href: "../IPhone14PRO-17/i-phone1-pro17.html" },
    ]

    const list = document.getElementById('lista');
    games.forEach(game => {
        const a = document.createElement('a');
        a.innerHTML = `<img class="listItemImage" src="${game.icon}" alt="${game.name}"><span class="listItemText">${game.name}</span>`;
        a.href = game.href;
        a.classList.add('listItem');
        list.appendChild(a);
    });
}

function search() {
    const listContainer = document.getElementById('lista');
    const listItems = listContainer.getElementsByClassName('listItem');
    const input = document.getElementById('searchInput').value.toLowerCase();
    let noResults = true;
    for (i = 0; i < listItems.length; i++) { 
        if (!listItems[i].lastChild.innerHTML.toLowerCase().includes(input) || input === "") {
            listItems[i].style.display = "none";
            continue;
        } else {
            listItems[i].style.display = "flex";
            noResults = false; 
        }
    }
    listContainer.style.display = noResults ? "none" : "block";
}

function bodyLoad() {
    loadSearchData();
}