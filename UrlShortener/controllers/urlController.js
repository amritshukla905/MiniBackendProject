const fs = require("fs");

const FILE = "./data/urls.json";

function readData() {
    try {
        return JSON.parse(fs.readFileSync(FILE, "utf8"));
    } catch (err) {
        return {};
    }
}

function saveData(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

function generate() {
    return Math.random().toString(36).substring(2, 8);
}

exports.createShort = (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            error: "URL Missing"
        });
    }

    const data = readData();

    const code = generate();

    data[code] = url;

    saveData(data);

    res.json({
        short: `http://localhost:3000/${code}`
    });
};

exports.redirectUrl = (req, res) => {
    const data = readData();

    const url = data[req.params.code];

    if (!url) {
        return res.status(404).send("Invalid URL");
    }

    res.redirect(url);
};