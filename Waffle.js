"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Waffle {
        centerX;
        centerY;
        constructor(_x, _y) {
            this.centerX = _x;
            this.centerY = _y;
        }
        setPosition(_x, _y) {
            this.centerX = _x;
            this.centerY = _y;
        }
        draw() {
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.moveTo(this.centerX - 40, this.centerY - 50);
            Eisdealer.crc2.lineTo(this.centerX, this.centerY + 50);
            Eisdealer.crc2.lineTo(this.centerX + 40, this.centerY - 50);
            Eisdealer.crc2.closePath();
            Eisdealer.crc2.fillStyle = "#D2B48C"; // Waffle color
            Eisdealer.crc2.fill();
            Eisdealer.crc2.strokeStyle = "black"; // Ensure border color is black
            Eisdealer.crc2.stroke();
        }
    }
    Eisdealer.Waffle = Waffle;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Waffle.js.map