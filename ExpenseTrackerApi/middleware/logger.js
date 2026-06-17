const fs = require("fs");
function logger (req,res,next){
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;

    fs.appendFileSync("./logs/app.log",log);
    next();
}

module.exports = logger;

// it is here to record the stuff/ request to record and save it to the app.log