"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Table {
        positionX;
        positionY;
        radius;
        color;
        constructor(_x, _y, _radius, _color) {
            this.positionX = _x;
            this.positionY = _y;
            this.radius = _radius;
            this.color = _color;
        }
        draw() {
            Eisdealer.crc2.save();
            Eisdealer.crc2.translate(this.positionX, this.positionY);
            Eisdealer.crc2.fillStyle = this.color;
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(0, 0, this.radius, 0, Math.PI * 2);
            Eisdealer.crc2.fill();
            Eisdealer.crc2.restore();
        }
    }
    Eisdealer.Table = Table;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Table.js.map