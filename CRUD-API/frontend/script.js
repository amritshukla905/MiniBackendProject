const API = "http://localhost:3000/users";
//Here URL is the location of the API
// where as API is the set of rules and protocols that allow different software
// application to communicate eachother and exchange data
async function load(){
    const res = 
    await fetch(API);
    const users = 
    await res.json();
// the Api response stored in the res and useres stored the json response
    const div = 
    document.getElementById("users");

    div.innerHTML = "";
    users.forEach(u=>{
        div.innerHTML +=`
        <div class = "card">
        <input value = "${u.name}"
        id = "${u.id}">
        <div>
        <button onClick ="edit(${u.id})">
        Edit
        </button>
        
        <button 
        onClick = "del(${u.id})">
        Delete
        </button>
        </div>
        </div>
        `
    });
}

async function createUser(){
    const name = document.getElementById("name").value;

    await fetch(API,{
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
// here it it telling the server that we are going to put the 
//json content 
            body:
                JSON.stringify({
                    name
                })
// look the server want json we are converting name string to json
        }
    );
    load();
};

async function edit(id) {
    const name = document.getElementById(id).value;

    await fetch(
        `${API}/${id}`,

        {
            method:"PUT",
            headers:{
                "Content-Type":
                "application/json"
            },
            body:
            JSON.stringify({
                name
            })
        }
    );
    load();
}
async function del(id){
    await fetch(
        `${API}/${id}`,
        {
            method:"DELETE"
        }
    );
    load();
}
load();
