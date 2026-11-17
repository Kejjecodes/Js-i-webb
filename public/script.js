const form = document.querySelector(".product-form");
const productList = document.querySelector("tbody");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const product = {
        name: String(formData.get("name") || "").trim(),
        price: Number(formData.get("price")),
        sku: String(formData.get("sku") || "").trim()
    };

    try {
        const response = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Servern kunde inte spara produkten.");
        }

        productList.querySelector(".empty-row")?.remove();

        const row = document.createElement("tr");
        for (const value of [product.name, product.sku, `${product.price} kr`, ""]) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        }
        productList.appendChild(row);
        form.reset();
    } catch (error) {
        window.alert(`Kunde inte spara produkten: ${error.message}`);
    }
});
