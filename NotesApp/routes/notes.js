const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const router = express.Router();

const dir = path.join(__dirname, "../data");
const file = path.join(dir, "notes.json");

async function ensureFile() {
    await fs.mkdir(dir, { recursive: true });

    try {
        await fs.access(file);
    } catch {
        await fs.writeFile(file, "[]");
    }
}

async function readNotes() {
    await ensureFile();
    const data = await fs.readFile(file, "utf8");
    return JSON.parse(data || "[]");
}

async function saveNotes(notes) {
    await fs.writeFile(file, JSON.stringify(notes, null, 2));
}

router.get("/", async (req, res) => {
    res.json(await readNotes());
});

router.post("/", async (req, res) => {
    const { title, text } = req.body;

    if (!title || !text) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const notes = await readNotes();

    const newNote = {
        id: Date.now(),
        title,
        text
    };

    notes.push(newNote);
    await saveNotes(notes);

    res.status(201).json(newNote);
});

router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);

    let notes = await readNotes();

    notes = notes.filter(n => n.id !== id);

    await saveNotes(notes);

    res.json({ success: true });
});

module.exports = router;