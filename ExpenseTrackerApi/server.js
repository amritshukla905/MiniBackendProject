const logger = require("./middleware/logger");
const express = require("express");
const app = express();

app.use(express.json()); 
// it is middleware that allows Express to read json
//data sent from the client. It converts incomeing json into
//javascript object and stores it in req.body , so we can acess data like req.body.title
// or req.body.amount insite routes and controllers.

app.use(logger);

app.use(express.static("public"));

app.use("/expenses",require("./routes/expenseRoutes"));
// this connest the main server with the routes

app.listen(3000,()=>{
    console.log("Server Running");
})