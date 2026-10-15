```javascript
/* =========================
   REWIND DIGICAM - SCRIPT
========================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       PRODUCT PAGE
       COLOR SELECTION
    ========================= */

    const colorButtons = document.querySelectorAll(".color-button");
    const selectedColor = document.getElementById("selectedColor");

    colorButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Remove selected state from all buttons
            colorButtons.forEach(function (btn) {
                btn.classList.remove("selected");
            });

            // Select clicked button
            button.classList.add("selected");

            // Update displayed color
            if (selectedColor) {
                selectedColor.textContent = button.dataset.color;
            }

        });

    });


    /* =========================
       ORDER PAGE
       QUANTITY
    ========================= */

    const quantityInput = document.getElementById("quantity");
    const minusButton = document.getElementById("minusButton");
    const plusButton = document.getElementById("plusButton");

    const summaryQuantity = document.getElementById("summaryQuantity");
    const cameraTotal = document.getElementById("cameraTotal");
    const subtotal = document.getElementById("subtotal");
    const totalPrice = document.getElementById("totalPrice");


    const cameraPrice = 129;


    // Update all prices and quantity
    function updateOrderSummary() {

        if (!quantityInput) {
            return;
        }

        let quantity = parseInt(quantityInput.value);

        // Make sure quantity stays between 1 and 5
        if (isNaN(quantity)) {
            quantity = 1;
        }

        if (quantity < 1) {
            quantity = 1;
        }

        if (quantity > 5) {
            quantity = 5;
        }

        quantityInput.value = quantity;


        // Camera total
        const cameraTotalPrice = cameraPrice * quantity;


        if (summaryQuantity) {
            summaryQuantity.textContent = quantity;
        }

        if (cameraTotal) {
            cameraTotal.textContent = "$" + cameraTotalPrice;
        }


        // Calculate accessories
        let accessoryTotal = 0;

        const accessoryChecks =
            document.querySelectorAll(".accessory-check");

        accessoryChecks.forEach(function (checkbox) {

            if (checkbox.checked) {

                accessoryTotal +=
                    Number(checkbox.dataset.price);

            }

        });


        // Final total
        const finalTotal =
            cameraTotalPrice + accessoryTotal;


        if (subtotal) {
            subtotal.textContent = "$" + finalTotal;
        }

        if (totalPrice) {
            totalPrice.textContent = "$" + finalTotal;
        }


        updateAccessorySummary();

    }


    /* =========================
       MINUS BUTTON
    ========================= */

    if (minusButton) {

        minusButton.addEventListener("click", function () {

            let quantity =
                parseInt(quantityInput.value);

            if (quantity > 1) {
                quantity--;

                quantityInput.value = quantity;

                updateOrderSummary();
            }

        });

    }


    /* =========================
       PLUS BUTTON
    ========================= */

    if (plusButton) {

        plusButton.addEventListener("click", function () {

            let quantity =
                parseInt(quantityInput.value);

            if (quantity < 5) {
                quantity++;

                quantityInput.value = quantity;

                updateOrderSummary();
            }

        });

    }


    /* =========================
       MANUAL QUANTITY INPUT
    ========================= */

    if (quantityInput) {

        quantityInput.addEventListener("input", function () {
            updateOrderSummary();
        });

    }


    /* =========================
       ACCESSORIES
    ========================= */

    const accessoryChecks =
        document.querySelectorAll(".accessory-check");


    accessoryChecks.forEach(function (checkbox) {

        checkbox.addEventListener("change", function () {

            updateOrderSummary();

        });

    });


    /* =========================
       ACCESSORY SUMMARY
    ========================= */

    function updateAccessorySummary() {

        const accessorySummary =
            document.getElementById("accessorySummary");

        if (!accessorySummary) {
            return;
        }


        accessorySummary.innerHTML = "";


        let selectedAccessories = 0;


        accessoryChecks.forEach(function (checkbox) {

            if (checkbox.checked) {

                selectedAccessories++;


                const item =
                    document.createElement("span");

                item.textContent =
                    checkbox.dataset.name +
                    " +$" +
                    checkbox.dataset.price;


                accessorySummary.appendChild(item);

            }

        });


        // If nothing is selected
        if (selectedAccessories === 0) {

            const emptyMessage =
                document.createElement("span");

            emptyMessage.textContent =
                "No accessories selected";

            accessorySummary.appendChild(emptyMessage);

        }

    }


    /* =========================
       ORDER COLOR
    ========================= */

    const orderColor =
        document.getElementById("orderColor");

    const summaryColor =
        document.getElementById("summaryColor");


    if (orderColor) {

        orderColor.addEventListener("change", function () {

            if (summaryColor) {

                summaryColor.textContent =
                    orderColor.value;

            }

        });

    }


    /* =========================
       PLACE ORDER
    ========================= */

    const placeOrderButton =
        document.getElementById("placeOrderButton");

    const orderMessage =
        document.getElementById("orderMessage");


    if (placeOrderButton) {

        placeOrderButton.addEventListener("click", function () {

            const fullName =
                document.getElementById("fullName").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const city =
                document.getElementById("city").value.trim();

            const address =
                document.getElementById("address").value.trim();


            /* =========================
               BASIC VALIDATION
            ========================= */

            if (
                fullName === "" ||
                email === "" ||
                phone === "" ||
                city === "" ||
                address === ""
            ) {

                orderMessage.textContent =
                    "Please complete all required fields.";

                orderMessage.style.color =
                    "#ff3f7f";

                return;

            }


            /* =========================
               EMAIL VALIDATION
            ========================= */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                orderMessage.textContent =
                    "Please enter a valid email address.";

                orderMessage.style.color =
                    "#ff3f7f";

                return;

            }


            /* =========================
               SUCCESS MESSAGE
            ========================= */

            orderMessage.textContent =
                "✓ Order placed successfully! Thank you, " +
                fullName + ".";

            orderMessage.style.color =
                "#181818";


            // Change button after successful order
            placeOrderButton.textContent =
                "ORDER PLACED ✓";

            placeOrderButton.style.backgroundColor =
                "#181818";


            // Prevent submitting again
            placeOrderButton.disabled = true;

        });

    }


    /* =========================
       INITIAL ORDER SUMMARY
    ========================= */

    updateOrderSummary();

});
```