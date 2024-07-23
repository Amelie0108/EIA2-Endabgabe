"use strict";
var Eisdealer;
(function (Eisdealer) {
    let currentCustomerIndex = 0;
    let tableNumber = 1;
    class Table {
        positionX;
        positionY;
        radius;
        color;
        tableLabel; // Variable for the table number
        constructor(_x, _y, _radius, _color) {
            this.positionX = _x;
            this.positionY = _y;
            this.radius = _radius;
            this.color = _color;
            this.tableLabel = (tableNumber++).toString(); // Set table number and increment
            // Hinzufügen des Click-Event-Listeners für diesen Tisch
            this.addClickListener(this.handleTableClick.bind(this));
        }
        draw() {
            Eisdealer.crc2.save();
            Eisdealer.crc2.translate(this.positionX, this.positionY);
            Eisdealer.crc2.fillStyle = this.color;
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(0, 0, this.radius, 0, Math.PI * 2);
            Eisdealer.crc2.fill();
            Eisdealer.crc2.fillStyle = "black";
            Eisdealer.crc2.font = "20px Arial";
            Eisdealer.crc2.textAlign = "center";
            Eisdealer.crc2.textBaseline = "middle";
            Eisdealer.crc2.fillText(this.tableLabel, 0, -this.radius / 2); // Draw the table number
            Eisdealer.crc2.restore();
        }
        addClickListener(listener) {
            Eisdealer.crc2.canvas.addEventListener('click', (event) => {
                let rect = Eisdealer.crc2.canvas.getBoundingClientRect();
                let x = event.clientX - rect.left;
                let y = event.clientY - rect.top;
                if (Math.sqrt((x - this.positionX) ** 2 + (y - this.positionY) ** 2) < this.radius) {
                    listener(event);
                }
            });
        }
        handleTableClick(event) {
            if (currentCustomerIndex >= Eisdealer.customers.length)
                return;
            let customer = Eisdealer.customers[currentCustomerIndex];
            customer.centerX = this.positionX;
            customer.centerY = this.positionY;
            currentCustomerIndex++;
        }
    }
    Eisdealer.Table = Table;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Table.js.map