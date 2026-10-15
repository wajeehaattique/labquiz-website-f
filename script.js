/* =========================
   REWIND DIGICAM - SCRIPT
========================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       PRODUCT PAGE
       COLOR SELECTION
    ========================= */

    const colorButtons =
        document.querySelectorAll(".color-button");

    const selectedColor =
        document.getElementById("selectedColor");
    
    if (colorButtons.length > 0 && !localStorage.getItem("selectedColor")) {
        localStorage.setItem("selectedColor", "SILVER");
    }

    colorButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            colorButtons.forEach(function (btn) {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            const color =
                button.dataset.color;

            if (selectedColor) {
                selectedColor.textContent = color;
            }

            // Save selected color
            localStorage.setItem(
                "selectedColor",
                color
            );

        });

    });



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


    const cameraPrice = 129;



    /* =========================
       UPDATE ORDER SUMMARY
    ========================= */

    function updateOrderSummary() {

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


        // Camera total
        const cameraTotalPrice =
            cameraPrice * quantity;


        if (summaryQuantity) {
            summaryQuantity.textContent =
                quantity;
        }


        if (cameraTotal) {
            cameraTotal.textContent =
                "$" + cameraTotalPrice;
        }



        /* =========================
           ACCESSORIES
        ========================= */

        let accessoryTotal = 0;


        const accessoryChecks =
            document.querySelectorAll(".accessory-check");


        accessoryChecks.forEach(function (checkbox) {

            if (checkbox.checked) {

                accessoryTotal +=
                    Number(checkbox.dataset.price);

            }

        });



        /* =========================
           FINAL TOTAL
        ========================= */

        const finalTotal =
            cameraTotalPrice + accessoryTotal;


        if (subtotal) {
            subtotal.textContent =
                "$" + finalTotal;
        }


        if (totalPrice) {
            totalPrice.textContent =
                "$" + finalTotal;
        }


        updateAccessorySummary();

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

                    updateOrderSummary();

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

                    updateOrderSummary();

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

                updateOrderSummary();

            }
        );

    }



    /* =========================
       ACCESSORIES
    ========================= */

    const accessoryChecks =
        document.querySelectorAll(".accessory-check");


    accessoryChecks.forEach(function (checkbox) {

        checkbox.addEventListener(
            "change",
            function () {

                updateOrderSummary();

            }
        );

    });



    /* =========================
       CHOSEN ACCESSORIES
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


        if (selectedAccessories === 0) {

            const emptyMessage =
                document.createElement("span");


            emptyMessage.textContent =
                "No accessories selected";


            accessorySummary.appendChild(
                emptyMessage
            );

        }

    }



    /* =========================
       ORDER COLOR
       CARRY CAMERA COLOR OVER
    ========================= */

    const orderColor =
        document.getElementById("orderColor");

    const summaryColor =
        document.getElementById("summaryColor");


    if (orderColor) {

        // Get color saved from camera page
        const savedColor =
            localStorage.getItem("selectedColor");


        if (savedColor) {

            // Find matching option by its text
            for (
                let i = 0;
                i < orderColor.options.length;
                i++
            ) {

                if (
                    orderColor.options[i]
                        .textContent
                        .trim()
                        .toUpperCase() ===
                    savedColor.toUpperCase()
                ) {

                    orderColor.selectedIndex = i;

                    break;

                }

            }


            if (summaryColor) {

                summaryColor.textContent =
                    savedColor;

            }

        } else {

            // Default to first color
            orderColor.selectedIndex = 0;


            if (summaryColor) {

                summaryColor.textContent =
                    orderColor.options[0]
                        .textContent
                        .trim()
                        .toUpperCase();

            }

        }


        // If user changes color on order page
        orderColor.addEventListener(
            "change",
            function () {

                const newColor =
                    orderColor.options[
                        orderColor.selectedIndex
                    ]
                        .textContent
                        .trim()
                        .toUpperCase();


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



                /* BASIC VALIDATION */

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



                /* EMAIL VALIDATION */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    orderMessage.textContent =
                        "Please enter a valid email address.";

                    orderMessage.style.color =
                        "#ff3f7f";

                    return;

                }



                /* SUCCESS */

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
       INITIAL ORDER SUMMARY
    ========================= */

    updateOrderSummary();

});
