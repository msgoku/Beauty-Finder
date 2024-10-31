// create a new wishlist
function createNewList() {
    const listName = document.getElementById("new-list-name").value.trim();
    if (!listName) {
        alert("Please enter a list name.");
        return;
    }

    const wishlistData = JSON.parse(localStorage.getItem("wishlistData")) || {};
    if (!wishlistData[listName]) {
        wishlistData[listName] = [];
        localStorage.setItem("wishlistData", JSON.stringify(wishlistData));
        alert(`Created new list: ${listName}`);
        displayLists();
    } else {
        alert("A list with this name already exists.");
    }

    document.getElementById("new-list-name").value = ""; 
}

// display all wishlist lists
function displayLists() {
    const wishlistData = JSON.parse(localStorage.getItem("wishlistData")) || {};
    const listsContainer = document.getElementById("lists-container");
    listsContainer.innerHTML = '';

    for (const listName in wishlistData) {
        const listDiv = document.createElement("div");
        listDiv.classList.add("wishlist-list");

        listDiv.innerHTML = `
            <div id="list-name-${listName}">
                <h3>${listName}</h3>
            </div>
            <div class="button-container">
                <button onclick="startEditListName('${listName}')">Edit Name</button>
                <button onclick="viewList('${listName}')">View List</button>
                <button onclick="deleteList('${listName}')">Delete List</button>
            </div>
        `;

        listsContainer.appendChild(listDiv);
    }
}

// edit a list name
function startEditListName(oldName) {
    const listNameDiv = document.getElementById(`list-name-${oldName}`);
    listNameDiv.classList.add('edit-mode'); 
    listNameDiv.innerHTML = `
        <input type="text" id="edit-input-${oldName}" value="${oldName}">
        <button class="save-button" onclick="saveListName('${oldName}')">Save</button>
        <button class="cancel-button" onclick="cancelEditListName('${oldName}')">Cancel</button>
    `;
}

// Save the edited list name
function saveListName(oldName) {
    const newName = document.getElementById(`edit-input-${oldName}`).value.trim();
    if (!newName || newName === oldName) {
        return cancelEditListName(oldName); 
    }

    const wishlistData = JSON.parse(localStorage.getItem("wishlistData")) || {};
    if (wishlistData[newName]) {
        alert("A list with this name already exists.");
        return;
    }

    // Update the list name in localStorage
    wishlistData[newName] = wishlistData[oldName];
    delete wishlistData[oldName];
    localStorage.setItem("wishlistData", JSON.stringify(wishlistData));

    alert(`List renamed to: ${newName}`);
    displayLists();
}

// Cancel edit and revert to displaying the old name
function cancelEditListName(oldName) {
    const listNameDiv = document.getElementById(`list-name-${oldName}`);
    listNameDiv.classList.remove('edit-mode'); 
    listNameDiv.innerHTML = `
        <h3>${oldName}</h3>
    `;
}

// view items in a specific list
function viewList(listName) {
    const wishlistData = JSON.parse(localStorage.getItem("wishlistData")) || {};
    const list = wishlistData[listName] || [];

    const listsContainer = document.getElementById("lists-container");
    listsContainer.innerHTML = `<h3>${listName}</h3>
                                <button onclick="closeListView()">Close</button>`;

    // Display list items
    list.forEach((product, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("wishlist-item");

        itemDiv.innerHTML = `
            <img src="${product.image_link || 'Image_not_available.png'}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <button onclick="removeItemFromList('${listName}', ${index})">Remove</button>
        `;

        listsContainer.appendChild(itemDiv);
    });
}

// close the list view and show main lists
function closeListView() {
    displayLists();
}

// remove an item from a specific list
function removeItemFromList(listName, index) {
    const wishlistData = JSON.parse(localStorage.getItem("wishlistData")) || {};
    wishlistData[listName].splice(index, 1); 
    localStorage.setItem("wishlistData", JSON.stringify(wishlistData));
    viewList(listName); 
}

// Function to delete a list entirely
function deleteList(listName) {
    const wishlistData = JSON.parse(localStorage.getItem("wishlistData")) || {};
    delete wishlistData[listName]; 
    localStorage.setItem("wishlistData", JSON.stringify(wishlistData));
    displayLists(); 
}

displayLists();
