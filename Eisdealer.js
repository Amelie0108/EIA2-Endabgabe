"use strict";
var Eisdealer;
(function (Eisdealer) {
    window.addEventListener("load", handleLoad);
    Eisdealer.tables = [];
    Eisdealer.customers = [];
    Eisdealer.iceCreamCircles = [];
    Eisdealer.sauces = [];
    Eisdealer.sprinkles = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        Eisdealer.crc2 = canvas.getContext("2d");
        drawBackground();
        drawPriceTable();
        Eisdealer.tables.push(new Eisdealer.Table(1450, 200, 130, 'pink'));
        Eisdealer.tables.push(new Eisdealer.Table(1450, 550, 100, 'pink'));
        Eisdealer.tables.push(new Eisdealer.Table(250, 700, 130, 'pink'));
        Eisdealer.tables.push(new Eisdealer.Table(610, 460, 130, 'pink'));
        Eisdealer.tables.push(new Eisdealer.Table(760, 780, 120, 'pink'));
        for (let table of Eisdealer.tables) {
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
        let totalPriceDiv = document.createElement("div");
        totalPriceDiv.className = "total-price";
        totalPriceDiv.textContent = "Total: 0.00 €";
        priceTableDiv.appendChild(totalPriceDiv);
        appDiv.appendChild(priceTableDiv);
        priceTableDiv.addEventListener("input", calculateTotalPrice);
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
        for (let circle of Eisdealer.iceCreamCircles) {
            circle.draw();
        }
        for (let sauce of Eisdealer.sauces) {
            sauce.draw();
        }
        for (let sprinkle of Eisdealer.sprinkles) {
            sprinkle.draw();
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
        // Clear the canvas
        Eisdealer.crc2.clearRect(0, 0, Eisdealer.crc2.canvas.width, Eisdealer.crc2.canvas.height);
        // Redraw the background, tables, and counter
        drawBackground();
        drawTables();
        drawCounter();
        // Draw all customers
        for (let customer of Eisdealer.customers) {
            customer.draw();
        }
        // Draw all ice cream circles
        drawIceCreamCircles();
        // Request next animation frame
        requestAnimationFrame(animate);
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