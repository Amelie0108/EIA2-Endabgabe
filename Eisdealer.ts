namespace Eisdealer {

    window.addEventListener("load", handleLoad);
    export let crc2: CanvasRenderingContext2D;

    export let tables: Table[] = [];
    export let customers: Customer[] = [];
    export let iceCreamCircles: IceCreamCircle[] = [];
    export let sauces: Sauce[] = [];
    export let sprinkles: Sprinkle[] = [];
    export let waffle: Waffle;
   
    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawBackground();
        drawPriceTable();

        tables.push(new Table(1450, 200, 130, 'pink'));
        tables.push(new Table(1450, 550, 100, 'pink'));
        tables.push(new Table(250, 700, 130, 'pink'));
        tables.push(new Table(610, 460, 130, 'pink'));
        tables.push(new Table(760, 780, 120, 'pink'));

        
        for (let table of tables) {
            table.draw();
        }

        let counter = new Counter(20, 20);
        counter.draw();

        waffle = new Waffle(700, 200);

        setInterval(addCustomer, 9000);
        // Start the animation loop
        requestAnimationFrame(animate);
    } 

    function drawBackground(): void {

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
    
            let pattern = crc2.createPattern(patternCanvas, 'repeat');
            if (pattern) {
                crc2.fillStyle = pattern;
                crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
            }
        }
}

function drawPriceTable(): void {
    let appDiv: HTMLElement | null = document.getElementById("app");
    if (!appDiv) return;

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
    let maxItems = Math.max(data.IceCream.length, data.Sauce.length, data.Sprinkles.length);
    for (let i = 0; i < maxItems; i++) {
        let row = document.createElement("tr");

        // Ice Cream column
        let iceCreamCell = document.createElement("td");
        if (i < data.IceCream.length) {
            let item = data.IceCream[i];
            iceCreamCell.innerHTML = `${item.name} <br><input type="number" min="0" value="0" data-category="IceCream" data-index="${i}" style="width: 50px;">`;
            iceCreamCell.querySelector('input')?.addEventListener('input', handleIceCreamInput);
        }
        row.appendChild(iceCreamCell);

        // Sauce column
        let sauceCell = document.createElement("td");
        if (i < data.Sauce.length) {
            let item = data.Sauce[i];
            sauceCell.innerHTML = `${item.name} <br><input type="number" min="0" value="0" data-category="Sauce" data-index="${i}" style="width: 50px;">`;
            sauceCell.querySelector('input')?.addEventListener('input', handleSauceInput);
        }
        row.appendChild(sauceCell);

        // Sprinkles column
        let sprinklesCell = document.createElement("td");
        if (i < data.Sprinkles.length) {
            let item = data.Sprinkles[i];
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

function calculateTotalPrice(): void {
    let total = 0;
    let inputs = document.querySelectorAll(".price-table input[type='number']");
    inputs.forEach(input => {
        let category = (input as HTMLInputElement).dataset.category;
        let index = (input as HTMLInputElement).dataset.index;
        if (category && index) {
            let item = data[category][parseInt(index)];
            total += item.price * parseInt((input as HTMLInputElement).value);
        }
    });

    let totalPriceDiv = document.querySelector(".total-price");
    if (totalPriceDiv) {
        totalPriceDiv.textContent = `Total: ${total.toFixed(2)} €`;
    }
}

function handleIceCreamInput(event: Event): void {
    let input = event.target as HTMLInputElement;
    let category = input.dataset.category;
    let index = input.dataset.index;

    if (category && index) {
        let item = data[category][parseInt(index)];
        let value = parseInt(input.value);

        // Remove existing circles for the specific category and index
        iceCreamCircles = iceCreamCircles.filter(circle => !(circle.category === category && circle.index === parseInt(index)));

        // Get the current count of ice cream circles
        let existingCount = iceCreamCircles.length;

        // Add new circles based on the current value
        for (let i = existingCount; i < existingCount + value; i++) {
            let position = getCirclePosition(i);
            let circle = new IceCreamCircle(position.x, position.y, 20, item.color, category, parseInt(index));
            iceCreamCircles.push(circle);
        }

        drawIceCreamCircles();
    }
}

function handleSauceInput(event: Event): void {
    let input = event.target as HTMLInputElement;
    let category = input.dataset.category;
    let index = input.dataset.index;

    if (category && index) {
        let item = data[category][parseInt(index)];
        let value = parseInt(input.value);

        // Clear previous sauces
        sauces = [];

        // Add new sauce for each ice cream circle
        if (value > 0) {
            iceCreamCircles.forEach(circle => {
                let sauce = new Sauce(circle.centerX, circle.centerY - circle.radius + 5, item.color, category, parseInt(index));
                sauces.push(sauce);
            });
        }

        drawIceCreamCircles();
    }
}

function handleSprinklesInput(event: Event): void {
    let input = event.target as HTMLInputElement;
    let category = input.dataset.category;
    let index = input.dataset.index;

    if (category && index) {
        let item = data[category][parseInt(index)];
        let value = parseInt(input.value);

        // Clear previous sprinkles
        sprinkles = [];

        // Add new sprinkles for each ice cream circle
        if (value > 0) {
            iceCreamCircles.forEach(circle => {
                for (let i = 0; i < value; i++) {
                    for (let j = 0; j < 5; j++) { // Add 5 points per sprinkle
                        let offsetX = Math.random() * 40 - 20;
                        let offsetY = Math.random() * 40 - 20;

                        // Ensure the sprinkle is within the circle
                        if (Math.sqrt(offsetX * offsetX + offsetY * offsetY) < 20) {
                            let sprinkle = new Sprinkle(circle.centerX + offsetX, circle.centerY + offsetY, item.color, category, parseInt(index));
                            sprinkles.push(sprinkle);
                        }
                    }
                }
            });
        }

        drawIceCreamCircles();
    }
}

function getCirclePosition(index: number): { x: number, y: number } {
    let x = waffle.centerX - 20 + (index % 2) * 40; // Alternate columns
    let y = waffle.centerY - 60 - Math.floor(index / 2) * 40; // Stack rows upwards
    return { x, y };
}

function drawIceCreamCircles(): void {

    for (let circle of iceCreamCircles) {
        circle.draw();
    }

    for (let sauce of sauces) {
        sauce.draw();
    }

    for (let sprinkle of sprinkles) {
        sprinkle.draw();
    }

    waffle.draw();
}

function addCustomer(): void {
    let x = getRandomInt(crc2.canvas.width - 300, crc2.canvas.width - 150);
    let y = getRandomInt(crc2.canvas.height - 150, crc2.canvas.height - 100);
    let customer = new Customer(x, y, 33, "#FAD074");
    customers.push(customer);
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function animate(): void {
    // Clear the canvas
    crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);

    // Redraw the background, tables, and counter
    drawBackground();
    drawTables();
    drawCounter();

    // Draw all customers
    for (let customer of customers) {
        customer.draw();
    }

    // Draw all ice cream circles
    drawIceCreamCircles();

    // Request next animation frame
    requestAnimationFrame(animate);
}

function drawTables(): void {
    for (let table of tables) {
        table.draw();
    }
}

function drawCounter(): void {
    let counter = new Counter(20, 20);
    counter.draw();
}
}

