function validateExpense(req, res, next) {

    const { title, amount, category } = req.body;

    if (!title || !category) {
        return res.status(400).json({
            message: "Title and category are required"
        });
    }

    if (typeof amount !== "number") {
        return res.status(400).json({
            message: "Amount must be a number"
        });
    }

    next();
}

module.exports = validateExpense;