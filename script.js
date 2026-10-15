document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       PRODUCT PAGE - COLORS
    ========================= */

    const colorButtons = document.querySelectorAll(".color-button");
    const selectedColor = document.getElementById("selectedColor");

    colorButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            colorButtons.forEach(function (btn) {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            const color = button.dataset.color;

            if (selectedColor) {
                selectedColor.textContent = color;
            }

            // Save selected color
            localStorage.setItem("selectedColor", color);

        });

    });


    /* =========================
       ORDER PAGE
       GET SAVED COLOR
    ========================= */

    const orderColor =
        document.getElementById("orderColor");

    const summaryColor =
        document.getElementById("summaryColor");

    if (orderColor) {

        const savedColor =
            localStorage.getItem("selectedColor");

        if (savedColor) {

            orderColor.value =
                savedColor;

            if (summaryColor) {
                summaryColor.textContent =
                    savedColor;
            }

        }


        // If user changes color on order page
        orderColor.addEventListener(
            "change",
            function () {

                const newColor =
                    orderColor.value;

                if (summaryColor) {
                    summaryColor.textContent =
                        newColor;
                }

                localStorage.setItem(
                    "selectedColor",
                    newColor
                );

            }
        );

    }


    /* =========================
       ORDER PAGE
       QUANTITY
    ========================= */

    const quantityInput =
        document.getElementById("quantity");

    const minusButton =
        document.getElementById("minusButton");

    const plusButton =
        document.getElementById("plusButton");

    const summaryQuantity =
        document.getElementById("summaryQuantity");

    const cameraTotal =
        document.getElementById("cameraTotal");

    const subtotal =
        document.getElementById("subtotal");

    const totalPrice =
        document.getElementById("totalPrice");

    const accessorySummary =
        document.getElementById("accessorySummary");

    const accessoryChecks =
        document.querySelectorAll(".accessory-check");


    const cameraPrice = 129;


    /* =========================
       UPDATE ORDER
    ========================= */

    function updateOrder() {

        if (!quantityInput) {
            return;
        }


        let quantity =
            parseInt(quantityInput.value);


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


        /* CAMERA TOTAL */

        const cameraCost =
            cameraPrice * quantity;


        if (summaryQuantity) {
            summaryQuantity.textContent =
                quantity;
        }


        if (cameraTotal) {
            cameraTotal.textContent =
                "$" + cameraCost;
        }


        /* ACCESSORIES */

        let accessoryCost = 0;

        let selectedAccessories = [];


        accessoryChecks.forEach(function (checkbox) {

            if (checkbox.checked) {

                const price =
                    Number(checkbox.dataset.price);

                const name =
                    checkbox.dataset.name;

                accessoryCost += price;

                selectedAccessories.push({
                    name: name,
                    price: price
                });

            }

        });


        /* CHOSEN ACCESSORIES */

        if (accessorySummary) {

            accessorySummary.innerHTML = "";


            if (selectedAccessories.length === 0) {

                const empty =
                    document.createElement("span");

                empty.textContent =
                    "No accessories selected";

                accessorySummary.appendChild(empty);

            } else {

                selectedAccessories.forEach(
                    function (accessory) {

                        const item =
                            document.createElement("span");

                        item.textContent =
                            accessory.name +
                            " +$" +
                            accessory.price;

                        accessorySummary.appendChild(item);

                    }
                );

            }

        }


        /* FINAL TOTAL */

        const finalTotal =
            cameraCost + accessoryCost;


        if (subtotal) {
            subtotal.textContent =
                "$" + finalTotal;
        }


        if (totalPrice) {
            totalPrice.textContent =
                "$" + finalTotal;
        }

    }


    /* =========================
       MINUS BUTTON
    ========================= */

    if (minusButton) {

        minusButton.addEventListener(
            "click",
            function () {

                let quantity =
                    parseInt(quantityInput.value);

                if (quantity > 1) {

                    quantity--;

                    quantityInput.value =
                        quantity;

                    updateOrder();

                }

            }
        );

    }


    /* =========================
       PLUS BUTTON
    ========================= */

    if (plusButton) {

        plusButton.addEventListener(
            "click",
            function () {

                let quantity =
                    parseInt(quantityInput.value);

                if (quantity < 5) {

                    quantity++;

                    quantityInput.value =
                        quantity;

                    updateOrder();

                }

            }
        );

    }


    /* =========================
       MANUAL QUANTITY
    ========================= */

    if (quantityInput) {

        quantityInput.addEventListener(
            "input",
            function () {
                updateOrder();
            }
        );

    }


    /* =========================
       ACCESSORIES
    ========================= */

    accessoryChecks.forEach(
        function (checkbox) {

            checkbox.addEventListener(
                "change",
                function () {
                    updateOrder();
                }
            );

        }
    );


    /* =========================
       PLACE ORDER
    ========================= */

    const placeOrderButton =
        document.getElementById(
            "placeOrderButton"
        );

    const orderMessage =
        document.getElementById(
            "orderMessage"
        );


    if (placeOrderButton) {

        placeOrderButton.addEventListener(
            "click",
            function () {

                const fullName =
                    document.getElementById(
                        "fullName"
                    ).value.trim();

                const email =
                    document.getElementById(
                        "email"
                    ).value.trim();

                const phone =
                    document.getElementById(
                        "phone"
                    ).value.trim();

                const city =
                    document.getElementById(
                        "city"
                    ).value.trim();

                const address =
                    document.getElementById(
                        "address"
                    ).value.trim();


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


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    orderMessage.textContent =
                        "Please enter a valid email address.";

                    orderMessage.style.color =
                        "#ff3f7f";

                    return;

                }


                orderMessage.textContent =
                    "✓ Order placed successfully! Thank you, " +
                    fullName + ".";

                orderMessage.style.color =
                    "#181818";


                placeOrderButton.textContent =
                    "ORDER PLACED ✓";

                placeOrderButton.style.backgroundColor =
                    "#181818";

                placeOrderButton.disabled =
                    true;

            }
        );

    }


    /* =========================
       STARTING VALUES
    ========================= */

    updateOrder();

});;