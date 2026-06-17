const fs = require("fs");
const FILE = "./data/expenses.json";

function readExpenses(){
    const data = fs.readFileSync(FILE,"utf-8");
    return JSON.parse(data);
}
function writeExpenses(data){
    fs.writeFileSync(
        FILE,
        JSON.stringify(data, null, 2),
        "utf-8"
    );
}
module.exports = {
    readExpenses,writeExpenses
}