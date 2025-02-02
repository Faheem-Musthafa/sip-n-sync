document.addEventListener("DOMContentLoaded", function () {
    // Tab Navigation
    const tabs = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            tabs.forEach(btn => btn.classList.remove("active"));
            contents.forEach(content => content.classList.remove("active"));

            this.classList.add("active");
            document.getElementById(this.dataset.tab).classList.add("active");
        });
    });

    // Sample Users
    const users = [
        { name: "Alice", role: "Developer" },
        { name: "Bob", role: "Designer" },
        { name: "Charlie", role: "Marketer" }
    ];

    const userList = document.getElementById("userList");

    users.forEach(user => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");
        userCard.textContent = `${user.name} - ${user.role}`;
        userList.appendChild(userCard);
    });

    // Discussion Board
    const discussionInput = document.getElementById("discussionInput");
    const discussionList = document.getElementById("discussionList");
    document.getElementById("postDiscussion").addEventListener("click", function () {
        if (discussionInput.value.trim() === "") return;

        const li = document.createElement("li");
        li.textContent = discussionInput.value;
        discussionList.appendChild(li);
        discussionInput.value = "";
    });

    // Resource Sharing
    const resourceInput = document.getElementById("resourceInput");
    const resourceList = document.getElementById("resourceList");
    document.getElementById("shareResource").addEventListener("click", function () {
        if (resourceInput.value.trim() === "") return;

        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = resourceInput.value;
        link.textContent = resourceInput.value;
        link.target = "_blank";

        li.appendChild(link);
        resourceList.appendChild(li);
        resourceInput.value = "";
    });
});
