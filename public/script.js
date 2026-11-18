const form = document.querySelector(".product-form");
const productName = document.querySelector("#name");
const price = document.querySelector("#price");
const sku = document.querySelector("#sku");
const description = document.querySelector("#description");
const productList = document.querySelector("tbody");

function addProductToTable(product) {
    const emptyRow = productList.querySelector(".empty-row");
    if (emptyRow) {
        emptyRow.remove();
    }

    const newRow = document.createElement("tr");
    const values = [product.name, product.sku, product.price + " kr"];

    for (const value of values) {
        const cell = document.createElement("td");
        cell.textContent = value;
        newRow.appendChild(cell);
    }

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Ta bort";

    deleteButton.addEventListener("click", async function () {
        try {
            const response = await fetch("/api/products/" + product.id, {
                method: "DELETE"
            });

            if (response.status !== 204) {
                throw new Error("Servern kunde inte ta bort produkten.");
            }

            newRow.remove();
            showEmptyMessage();
        } catch (error) {
            alert(error.message);
        }
    });

    deleteCell.appendChild(deleteButton);
    newRow.appendChild(deleteCell);
    productList.appendChild(newRow);
}

function showEmptyMessage() {
    if (productList.children.length > 0) {
        return;
    }

    const emptyRow = document.createElement("tr");
    emptyRow.className = "empty-row";

    const messageCell = document.createElement("td");
    messageCell.colSpan = 4;
    messageCell.textContent = "Inga produkter att visa ännu.";

    emptyRow.appendChild(messageCell);
    productList.appendChild(emptyRow);
}

async function loadProducts() {
    try {
        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Kunde inte hämta produkterna.");
        }

        const products = await response.json();

        products.forEach(function (product) {
            addProductToTable(product);
        });
    } catch (error) {
        alert(error.message);
    }
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nameValue = productName.value.trim();
    const priceValue = Number(price.value);
    const skuValue = sku.value.trim();
    const descriptionValue = description.value.trim();

    const product = {
        name: nameValue,
        price: priceValue,
        sku: skuValue,
        description: descriptionValue
    };

    try {
        const response = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });

        if (response.status !== 201) {
            throw new Error("Servern kunde inte spara produkten.");
        }

        const result = await response.json();
        product.id = result.id;
        addProductToTable(product);
        form.reset();
    } catch (error) {
        alert("Kunde inte spara produkten: " + error.message);
    }
});

loadProducts();
