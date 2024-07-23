"use strict";
var Eisdealer;
(function (Eisdealer) {
    window.addEventListener("load", handleLoad);
    Eisdealer.tables = [];
    Eisdealer.customers = [];
    Eisdealer.iceCreamCircles = [];
    Eisdealer.sauces = [];
    Eisdealer.sprinkles = [];
    let tableItems = {};
    let payButtons = {};
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        Eisdealer.crc2 = canvas.getContext("2d");
        drawBackground();
        drawPriceTable();
        let tablePositions = [
            { x: 1450, y: 200, radius: 130 },
            { x: 1500, y: 550, radius: 100 },
            { x: 250, y: 700, radius: 130 },
            { x: 610, y: 550, radius: 130 },
            { x: 1060, y: 660, radius: 120 }
        ];
        for (let pos of tablePositions) {
            let table = new Eisdealer.Table(pos.x, pos.y, pos.radius, 'pink');
            Eisdealer.tables.push(table);
            table.draw();
        }
        let counter = new Eisdealer.Counter(20, 20);
        counter.draw();
        Eisdealer.waffle = new Eisdealer.Waffle(700, 200);
        setInterval(addCustomer, 9000);
        // Start the animation loop
        requestAnimationFrame(animate);
    }
    function drawBackground() {
        let size = 50;
        let patternCanvas = document.createElement('canvas');
        patternCanvas.width = size * 2;
        patternCanvas.height = size * 2;
        let patternContext = patternCanvas.getContext('2d');
        if (patternContext) {
            patternContext.fillStyle = "#E0EFEA";
            patternContext.fillRect(0, 0, size, size);
            patternContext.fillRect(size, size, size, size);
            patternContext.fillStyle = "#81BECE";
            patternContext.fillRect(size, 0, size, size);
            patternContext.fillRect(0, size, size, size);
            let pattern = Eisdealer.crc2.createPattern(patternCanvas, 'repeat');
            if (pattern) {
                Eisdealer.crc2.fillStyle = pattern;
                Eisdealer.crc2.fillRect(0, 0, Eisdealer.crc2.canvas.width, Eisdealer.crc2.canvas.height);
            }
        }
    }
    function drawPriceTable() {
        let appDiv = document.getElementById("app");
        if (!appDiv)
            return;
        let priceTableDiv = document.createElement("div");
        priceTableDiv.className = "price-table";
        let table = document.createElement("table");
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");
        let headerRow = document.createElement("tr");
        // Table headers
        ["Ice Cream", "Sauce", "Sprinkles"].forEach(text => {
            let th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        // Create rows for the maximum number of items in any category
        let maxItems = Math.max(Eisdealer.data.IceCream.length, Eisdealer.data.Sauce.length, Eisdealer.data.Sprinkles.length);
        for (let i = 0; i < maxItems; i++) {
            let row = document.createElement("tr");
            // Ice Cream column
            let iceCreamCell = document.createElement("td");
            if (i < Eisdealer.data.IceCream.length) {
                let item = Eisdealer.data.IceCream[i];
                iceCreamCell.innerHTML = `${item.name} <br><input type="number" min="0" value="0" data-category="IceCream" data-index="${i}" style="width: 50px;">`;
                iceCreamCell.querySelector('input')?.addEventListener('input', handleIceCreamInput);
            }
            row.appendChild(iceCreamCell);
            // Sauce column
            let sauceCell = document.createElement("td");
            if (i < Eisdealer.data.Sauce.length) {
                let item = Eisdealer.data.Sauce[i];
                sauceCell.innerHTML = `${item.name} <br><input type="number" min="0" value="0" data-category="Sauce" data-index="${i}" style="width: 50px;">`;
                sauceCell.querySelector('input')?.addEventListener('input', handleSauceInput);
            }
            row.appendChild(sauceCell);
            // Sprinkles column
            let sprinklesCell = document.createElement("td");
            if (i < Eisdealer.data.Sprinkles.length) {
                let item = Eisdealer.data.Sprinkles[i];
                sprinklesCell.innerHTML = `${item.name} <br><input type="number" min="0" value="0" data-category="Sprinkles" data-index="${i}" style="width: 50px;">`;
                sprinklesCell.querySelector('input')?.addEventListener('input', handleSprinklesInput);
            }
            row.appendChild(sprinklesCell);
            tbody.appendChild(row);
        }
        table.appendChild(tbody);
        priceTableDiv.appendChild(table);
        // Add the table selection dropdown below the table
        let tableSelectDiv = document.createElement("div");
        tableSelectDiv.className = "table-select";
        let tableSelectLabel = document.createElement("label");
        tableSelectLabel.textContent = "Select a Table: ";
        tableSelectDiv.appendChild(tableSelectLabel);
        let tableSelect = document.createElement("select");
        tableSelect.innerHTML = `
            <option value="">Select a Table</option>
            <option value="0">Table 1</option>
            <option value="1">Table 2</option>
            <option value="2">Table 3</option>
            <option value="3">Table 4</option>
            <option value="4">Table 5</option>
        `;
        tableSelectDiv.appendChild(tableSelect);
        priceTableDiv.appendChild(tableSelectDiv);
        let saveButton = document.createElement("button");
        saveButton.textContent = "Save and Serve Ice Cream";
        saveButton.addEventListener("click", () => handleSaveButton(tableSelect));
        priceTableDiv.appendChild(saveButton);
        let totalPriceDiv = document.createElement("div");
        totalPriceDiv.className = "total-price";
        totalPriceDiv.textContent = "Total: 0.00 €";
        priceTableDiv.appendChild(totalPriceDiv);
        appDiv.appendChild(priceTableDiv);
        priceTableDiv.addEventListener("input", calculateTotalPrice);
    }
    function handleSaveButton(tableSelect) {
        let tableIndex = parseInt(tableSelect.value);
        if (tableIndex >= 0 && tableIndex < Eisdealer.tables.length) {
            moveIceCreamToTable(tableIndex);
            resetTable();
        }
        else {
            alert("Please select a valid table.");
        }
    }
    function moveIceCreamToTable(tableIndex) {
        let selectedTable = Eisdealer.tables[tableIndex];
        // Clone the current ice cream circles, sauces, and sprinkles
        let items = [
            ...Eisdealer.iceCreamCircles.map(circle => new Eisdealer.IceCreamCircle(selectedTable.positionX, selectedTable.positionY, circle.radius, circle.color, circle.category, circle.index)),
            ...Eisdealer.sauces.map(sauce => new Eisdealer.Sauce(selectedTable.positionX, selectedTable.positionY - 5, sauce.color, sauce.category, sauce.index)),
            ...Eisdealer.sprinkles.map(sprinkle => new Eisdealer.Sprinkle(selectedTable.positionX, selectedTable.positionY, sprinkle.color, sprinkle.category, sprinkle.index))
        ];
        if (!tableItems[tableIndex]) {
            tableItems[tableIndex] = [];
        }
        tableItems[tableIndex].push(...items);
        // Find the closest customer to the selected table
        let closestCustomer = null;
        let minDistance = Infinity;
        for (let customer of Eisdealer.customers) {
            let distance = Math.sqrt(Math.pow(customer.centerX - selectedTable.positionX, 2) +
                Math.pow(customer.centerY - selectedTable.positionY, 2));
            if (distance < minDistance) {
                minDistance = distance;
                closestCustomer = customer;
            }
        }
        if (closestCustomer) {
            closestCustomer.interact();
        }
        drawIceCreamCircles();
        // Set a timeout to remove the ice cream circles after 15 seconds
        setTimeout(() => {
            tableItems[tableIndex] = tableItems[tableIndex].filter(item => !items.includes(item));
            drawIceCreamCircles();
            showPayButton(tableIndex, closestCustomer);
        }, 15000);
    }
    function showPayButton(tableIndex, customer) {
        if (!customer)
            return;
        let button = document.createElement("button");
        button.textContent = "Pay";
        button.className = "pay-button";
        button.style.position = "absolute";
        button.style.left = `${Eisdealer.tables[tableIndex].positionX + 20}px`;
        button.style.top = `${Eisdealer.tables[tableIndex].positionY + 20}px`;
        button.addEventListener("click", () => {
            removeCustomer(customer);
            button.remove();
        });
        document.body.appendChild(button);
        payButtons[tableIndex] = button;
    }
    function removeCustomer(customer) {
        Eisdealer.customers = Eisdealer.customers.filter(c => c !== customer);
        drawIceCreamCircles();
    }
    function resetTable() {
        let inputs = document.querySelectorAll(".price-table input[type='number']");
        inputs.forEach(input => {
            input.value = "0";
        });
        let tableSelect = document.querySelector(".table-select select");
        tableSelect.value = "";
        // Clear current ice cream circles on the waffle
        Eisdealer.iceCreamCircles = [];
        Eisdealer.sauces = [];
        Eisdealer.sprinkles = [];
        drawIceCreamCircles();
    }
    function calculateTotalPrice() {
        let total = 0;
        let inputs = document.querySelectorAll(".price-table input[type='number']");
        inputs.forEach(input => {
            let category = input.dataset.category;
            let index = input.dataset.index;
            if (category && index) {
                let item = Eisdealer.data[category][parseInt(index)];
                total += item.price * parseInt(input.value);
            }
        });
        let totalPriceDiv = document.querySelector(".total-price");
        if (totalPriceDiv) {
            totalPriceDiv.textContent = `Total: ${total.toFixed(2)} €`;
        }
    }
    function handleIceCreamInput(event) {
        let input = event.target;
        let category = input.dataset.category;
        let index = input.dataset.index;
        if (category && index) {
            let item = Eisdealer.data[category][parseInt(index)];
            let value = parseInt(input.value);
            // Remove existing circles for the specific category and index
            Eisdealer.iceCreamCircles = Eisdealer.iceCreamCircles.filter(circle => !(circle.category === category && circle.index === parseInt(index)));
            // Get the current count of ice cream circles
            let existingCount = Eisdealer.iceCreamCircles.length;
            // Add new circles based on the current value
            for (let i = existingCount; i < existingCount + value; i++) {
                let position = getCirclePosition(i);
                let circle = new Eisdealer.IceCreamCircle(position.x, position.y, 20, item.color, category, parseInt(index));
                Eisdealer.iceCreamCircles.push(circle);
            }
            drawIceCreamCircles();
        }
    }
    function handleSauceInput(event) {
        let input = event.target;
        let category = input.dataset.category;
        let index = input.dataset.index;
        if (category && index) {
            let item = Eisdealer.data[category][parseInt(index)];
            let value = parseInt(input.value);
            // Clear previous sauces
            Eisdealer.sauces = [];
            // Add new sauce for each ice cream circle
            if (value > 0) {
                Eisdealer.iceCreamCircles.forEach(circle => {
                    let sauce = new Eisdealer.Sauce(circle.centerX, circle.centerY - circle.radius + 5, item.color, category, parseInt(index));
                    Eisdealer.sauces.push(sauce);
                });
            }
            drawIceCreamCircles();
        }
    }
    function handleSprinklesInput(event) {
        let input = event.target;
        let category = input.dataset.category;
        let index = input.dataset.index;
        if (category && index) {
            let item = Eisdealer.data[category][parseInt(index)];
            let value = parseInt(input.value);
            // Clear previous sprinkles
            Eisdealer.sprinkles = [];
            // Add new sprinkles for each ice cream circle
            if (value > 0) {
                Eisdealer.iceCreamCircles.forEach(circle => {
                    for (let i = 0; i < value; i++) {
                        for (let j = 0; j < 5; j++) { // Add 5 points per sprinkle
                            let offsetX = Math.random() * 40 - 20;
                            let offsetY = Math.random() * 40 - 20;
                            // Ensure the sprinkle is within the circle
                            if (Math.sqrt(offsetX * offsetX + offsetY * offsetY) < 20) {
                                let sprinkle = new Eisdealer.Sprinkle(circle.centerX + offsetX, circle.centerY + offsetY, item.color, category, parseInt(index));
                                Eisdealer.sprinkles.push(sprinkle);
                            }
                        }
                    }
                });
            }
            drawIceCreamCircles();
        }
    }
    function getCirclePosition(index) {
        let x = Eisdealer.waffle.centerX - 20 + (index % 2) * 40; // Alternate columns
        let y = Eisdealer.waffle.centerY - 60 - Math.floor(index / 2) * 40; // Stack rows upwards
        return { x, y };
    }
    function drawIceCreamCircles() {
        Eisdealer.crc2.clearRect(0, 0, Eisdealer.crc2.canvas.width, Eisdealer.crc2.canvas.height);
        // Redraw the background and other elements
        drawBackground();
        drawCounter();
        drawTables();
        for (let customer of Eisdealer.customers) {
            customer.draw();
        }
        // Draw the ice cream circles on the waffle
        for (let circle of Eisdealer.iceCreamCircles) {
            circle.draw();
        }
        for (let sauce of Eisdealer.sauces) {
            sauce.draw();
        }
        for (let sprinkle of Eisdealer.sprinkles) {
            sprinkle.draw();
        }
        // Draw the ice cream circles at the tables
        for (let tableIndex in tableItems) {
            tableItems[tableIndex].forEach(item => {
                item.draw();
            });
        }
        Eisdealer.waffle.draw();
    }
    function addCustomer() {
        let x = getRandomInt(Eisdealer.crc2.canvas.width - 300, Eisdealer.crc2.canvas.width - 150);
        let y = getRandomInt(Eisdealer.crc2.canvas.height - 150, Eisdealer.crc2.canvas.height - 100);
        let customer = new Eisdealer.Customer(x, y, 33, "#FAD074");
        Eisdealer.customers.push(customer);
    }
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function animate() {
        // Request next animation frame
        requestAnimationFrame(animate);
        // Draw all elements
        drawIceCreamCircles();
    }
    function drawTables() {
        for (let table of Eisdealer.tables) {
            table.draw();
        }
    }
    function drawCounter() {
        let counter = new Eisdealer.Counter(20, 20);
        counter.draw();
    }
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Eisdealer.js.map