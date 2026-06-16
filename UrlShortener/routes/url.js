const express = require("express");

const router = express.Router();

const {
    createShort,
    redirectUrl
} = require("../controllers/urlController");

router.post("/shorten", createShort);

router.get("/:code", redirectUrl);

module.exports = router;