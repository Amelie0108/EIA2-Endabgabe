"use strict";
var Eisdealer;
(function (Eisdealer) {
    class IceCreamCircle {
        centerX;
        centerY;
        radius;
        color;
        category;
        index;
        constructor(_x, _y, _radius, _color, _category, _index) {
            this.centerX = _x;
            this.centerY = _y;
            this.radius = _radius;
            this.color = _color;
            this.category = _category;
            this.index = _index;
        }
        draw() {
            // Draw the ice cream circle
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2, true);
            Eisdealer.crc2.fillStyle = this.color;
            Eisdealer.crc2.fill();
            Eisdealer.crc2.strokeStyle = "black"; // Ensure border color is black
            Eisdealer.crc2.stroke();
        }
    }
    Eisdealer.IceCreamCircle = IceCreamCircle;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=IceCreamCircle.js.map