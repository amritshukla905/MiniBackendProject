const {readExpenses, writeExpenses} = require("../utils/fileHelper");


exports.getExpenses = (req,res)=>{

    const expenses = readExpenses();

    res.json(expenses);

};
exports.createExpense = (req,res)=>{
    const expenses = readExpenses();
    const newExpense = {
        id: Date.now(),
        title: req.body.title,
        amount: req.body.amount,
        category:req.body.category
    }
    expenses.push(newExpense);
    writeExpenses(expenses);
    res.status(201).json(newExpense);
}

exports.updateExpense = (req,res)=>{
    const expenses = readExpenses();
    const expense = expenses.find(
        item => item.id == req.params.id
    );
    if(!expense){
        return res.status(404).json({
            message:"Expense not found"
        });
    }

    expense.title = req.body.title || expense.title;
    expense.amount = req.body.amount || expense.amount;
    expense.category = req.body.category || expense.category;
    writeExpenses(expenses);
    res.json(expense);
}

exports.deleteExpense = (req,res)=>{

    const expenses = readExpenses();

    const updatedExpenses = expenses.filter(
        item => item.id != req.params.id
    );

    if(updatedExpenses.length === expenses.length){
        return res.status(404).json({
            message:"Expense not found"
        });
    }

    writeExpenses(updatedExpenses);

    res.json({
        message:"Expense deleted successfully"
    });
};

exports.getSummary = (req,res)=>{

    const expenses = readExpenses();

    const total = expenses.reduce(
        (sum, expense)=> sum + expense.amount,
        0
    );

    const count = expenses.length;

    const average = count ? total / count : 0;


    res.json({
        total,
        count,
        average
    });

};