// Classic Status Bar Scroller
var msg = "Welcome to FDJTS's Retro Homepage...   Coding like it's 1999...   Enjoy your stay!   ";
var pos = 0;
function scrollTitle() {
    document.title = msg.substring(pos, msg.length) + msg.substring(0, pos);
    window.status = msg.substring(pos, msg.length) + msg.substring(0, pos);
    pos++;
    if (pos > msg.length) pos = 0;
    window.setTimeout("scrollTitle()", 200);
}

// Display simple welcome time
function welcome() {
    var d = new Date();
    var h = d.getHours();
    var greeting;
    if (h < 12) greeting = "Good Morning!";
    else if (h < 18) greeting = "Good Afternoon!";
    else greeting = "Good Evening!";

    // Non-intrusive alert
    // alert(greeting + " Welcome to my retro site.");
    scrollTitle();
}

// Attach to body onload the old school way
window.onload = welcome;

// Disable right click script (Very 90s)
function clickIE4() {
    if (event.button == 2) {
        alert("Copyright FDJTS - Right click disabled!");
        return false;
    }
}
function clickNS4(e) {
    if (document.layers || document.getElementById && !document.all) {
        if (e.which == 2 || e.which == 3) {
            alert("Copyright FDJTS - Right click disabled!");
            return false;
        }
    }
}
if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown = clickNS4;
}
else if (document.all && !document.getElementById) {
    document.onmousedown = clickIE4;
}
document.oncontextmenu = new Function("alert('Copyright FDJTS - Right click disabled!');return false")

// Dynamic GitHub Fetching
document.addEventListener("DOMContentLoaded", () => {
    const projectList = document.getElementById("retro-project-list");
    if (projectList) {
        fetch("https://api.github.com/users/FDJTS/repos?sort=updated")
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then(repos => {
                projectList.innerHTML = ""; // Clear loading message
                repos.slice(0, 16).forEach(repo => {
                    const card = document.createElement("div");
                    card.className = "retro-project-card";

                    const title = document.createElement("h3");
                    title.textContent = repo.name;

                    const desc = document.createElement("p");
                    // Truncate description if too long
                    const descriptionText = repo.description || "No description available.";
                    desc.innerHTML = `<font size="2">${descriptionText.length > 100 ? descriptionText.substring(0, 100) + "..." : descriptionText}</font>`;

                    const link = document.createElement("a");
                    link.href = repo.html_url;
                    link.target = "_blank";
                    link.textContent = "[ VIEW CODE ]";

                    card.appendChild(title);
                    card.appendChild(desc);
                    card.appendChild(link);
                    projectList.appendChild(card);
                });
            })
            .catch(err => {
                console.error("Fetch Error:", err);
                projectList.innerHTML = `<p><font color='red'>Error loading projects: ${err.message}. <br>Please try again later.</font></p>`;
            });
    }
});
