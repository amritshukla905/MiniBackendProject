console.log("script loaded");

async function create() {
    const url = document.getElementById("url").value;

    if (!url) {
        alert("Please enter a URL");
        return;
    }

    try {
        const response = await fetch("/shorten", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        document.getElementById("result").innerHTML =
            `<a href="${data.short}" target="_blank">${data.short}</a>`;

    } catch (err) {
        console.error(err);
        document.getElementById("result").textContent =
            "Error creating short URL";
    }
}

document.getElementById("btn").addEventListener("click", create);