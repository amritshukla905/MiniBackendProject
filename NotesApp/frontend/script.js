const API = "http://localhost:3000/notes";

const title = document.getElementById("title");
const text = document.getElementById("text");
const grid = document.querySelector(".notes-grid");

document.getElementById("addBtn").addEventListener("click", addNote);

async function loadNotes() {
    const res = await fetch(API);
    const data = await res.json();

    grid.innerHTML = "";

    data.forEach(note => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.text}</p>
            <button onclick="deleteNote(${note.id})">Delete</button>
        `;

        grid.appendChild(div);
    });
}

async function addNote() {
    if (!title.value || !text.value) return;

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title.value,
            text: text.value
        })
    });

    title.value = "";
    text.value = "";

    loadNotes();
}

async function deleteNote(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadNotes();
}

loadNotes();