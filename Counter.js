"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Counter {
        positionX;
        positionY;
        constructor(_x, _y) {
            this.positionX = _x;
            this.positionY = _y;
        }
        draw() {
            Eisdealer.crc2.save();
            Eisdealer.crc2.translate(this.positionX, this.positionY);
            Eisdealer.crc2.fillStyle = "#ccc";
            Eisdealer.crc2.fillRect(0, 0, 880, 370);
            Eisdealer.crc2.restore();
            Eisdealer.crc2.restore();
        }
    }
    Eisdealer.Counter = Counter;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Counter.js.map