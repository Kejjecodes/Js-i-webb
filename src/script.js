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