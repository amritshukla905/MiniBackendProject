const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// Tjis line is an Express middlewale that tells the server to 
//serve static files from the public folder

//Static files are the files that can be sent directly to the browser 
// without any server side processing such as basic html css and js


app.use("/", require("./routes/url"));

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
})