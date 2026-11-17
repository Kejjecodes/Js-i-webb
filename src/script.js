import { name } from "../db/db";

const knapp = document.getElementById("add-product-button");

knapp.addEventListener("click", function() {
    const form = document.getElementById("add-product-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        // PreventDefault förhindrar att sidan laddas om när formuläret skickas in
    });
});

    const formData = new FormData(document.getElementById("add-product-form"));
    const name = formData.get("name");
    const price = formData.get("price");
    const sku = formData.get("sku");

    productlist.getElementById("empty-row")?.remove();

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${name}</td>
        <td>${price}</td>
        <td>${sku}</td>
    `;

    for (const value of [name, sku, `${price} kr`]) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
    }

    row.appendChild(document.createElement("td"));
    productlist.appendChild(row);

    form.reset();