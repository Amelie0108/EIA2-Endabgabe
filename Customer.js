"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Customer {
        centerX;
        centerY;
        radius;
        color;
        lastInteraction;
        isHappy;
        constructor(_x, _y, _radius, _color) {
            this.centerX = _x;
            this.centerY = _y;
            this.radius = _radius;
            this.color = _color;
            this.lastInteraction = Date.now();
            this.isHappy = true;
            // Set an interval to check the inaction time
            setInterval(this.checkInactivity.bind(this), 1500);
        }
        draw() {
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2, true);
            Eisdealer.crc2.fillStyle = this.color;
            Eisdealer.crc2.fill();
            Eisdealer.crc2.strokeStyle = "black"; // Ensure border color is black
            Eisdealer.crc2.stroke();
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(this.centerX - 10, this.centerY - 10, 4, 0, Math.PI * 2, true);
            Eisdealer.crc2.fillStyle = "black";
            Eisdealer.crc2.fill();
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(this.centerX + 10, this.centerY - 10, 4, 0, Math.PI * 2, true);
            Eisdealer.crc2.fillStyle = "black";
            Eisdealer.crc2.fill();
            // Draw mouth based on isHappy state
            Eisdealer.crc2.beginPath();
            if (this.isHappy) {
                Eisdealer.crc2.arc(this.centerX, this.centerY + 5, 14, 0, Math.PI, false);
            }
            else {
                Eisdealer.crc2.arc(this.centerX, this.centerY + 15, 14, 0, Math.PI, true);
            }
            Eisdealer.crc2.stroke();
        }
        interact() {
            this.lastInteraction = Date.now();
            this.isHappy = true;
        }
        checkInactivity() {
            const currentTime = Date.now();
            if (currentTime - this.lastInteraction > 20000) {
                this.isHappy = false;
            }
        }
    }
    Eisdealer.Customer = Customer;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Customer.js.map