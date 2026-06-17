async function loadExpenses(){

    const res = await fetch("/expenses");

    const expenses = await res.json();


    const list = document.getElementById("list");

    list.innerHTML="";


    expenses.forEach(expense=>{


        const li=document.createElement("li");


        li.innerHTML=`

        <span>
        ${expense.title}
        <br>
        ₹${expense.amount}
        (${expense.category})
        </span>


        <button onclick="deleteExpense(${expense.id})">
        ❌
        </button>

        `;


        list.appendChild(li);

    });

}



async function addExpense(){


    await fetch("/expenses",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            title:
            document.getElementById("title").value,


            amount:
            Number(document.getElementById("amount").value),


            category:
            document.getElementById("category").value

        })

    });


    loadExpenses();

}



async function deleteExpense(id){

    await fetch(`/expenses/${id}`,{

        method:"DELETE"

    });


    loadExpenses();

}



loadExpenses();