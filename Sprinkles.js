"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Sprinkle {
        centerX;
        centerY;
        color;
        category;
        index;
        offsetX;
        offsetY;
        constructor(_x, _y, _color, _category, _index) {
            this.centerX = _x;
            this.centerY = _y;
            this.color = _color;
            this.category = _category;
            this.index = _index;
            do {
                this.offsetX = Math.random() * 40 - 20;
                this.offsetY = Math.random() * 40 - 20;
            } while (Math.sqrt(this.offsetX * this.offsetX + this.offsetY * this.offsetY) >= 20);
        }
        draw() {
            // Save the current state
            Eisdealer.crc2.save();
            // Draw sprinkles based on color
            Eisdealer.crc2.fillStyle = this.color;
            if (this.color === "#583E26") { // Chocolate Sprinkles
                Eisdealer.crc2.fillRect(this.centerX + this.offsetX, this.centerY + this.offsetY, 3, 8); // Adjust size as needed
            }
            else if (this.color === "#F2A60A") { // Star Sprinkles
                Eisdealer.crc2.beginPath();
                Eisdealer.crc2.moveTo(this.centerX + this.offsetX, this.centerY + this.offsetY);
                Eisdealer.crc2.lineTo(this.centerX + this.offsetX + 5, this.centerY + this.offsetY + 15);
                Eisdealer.crc2.lineTo(this.centerX + this.offsetX + 10, this.centerY + this.offsetY);
                Eisdealer.crc2.lineTo(this.centerX + this.offsetX, this.centerY + this.offsetY + 10);
                Eisdealer.crc2.lineTo(this.centerX + this.offsetX + 10, this.centerY + this.offsetY + 10);
                Eisdealer.crc2.closePath();
                Eisdealer.crc2.fill();
            }
            // Restore the state to ensure other drawings are not affected
            Eisdealer.crc2.restore();
        }
    }
    Eisdealer.Sprinkle = Sprinkle;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Sprinkles.js.map