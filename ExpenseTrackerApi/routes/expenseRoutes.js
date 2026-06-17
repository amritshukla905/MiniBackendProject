const express = require("express");
const router = express.Router();

const validateExpense = require("../middleware/validateExpense");

const {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
    getSummary
} = require("../controllers/expenseController");

router.get("/", getExpenses);

router.post("/", validateExpense, createExpense);

router.put("/:id", updateExpense);

router.delete("/:id", deleteExpense);

module.exports = router;