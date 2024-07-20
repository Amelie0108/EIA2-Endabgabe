"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Sauce {
        centerX;
        centerY;
        color;
        category;
        index;
        constructor(_x, _y, _color, _category, _index) {
            this.centerX = _x;
            this.centerY = _y + 10;
            this.color = _color;
            this.category = _category;
            this.index = _index;
        }
        draw() {
            // Save the current state
            Eisdealer.crc2.save();
            // Draw only the top half of the circle for the sauce
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(this.centerX, this.centerY, 20, 0, Math.PI, true);
            Eisdealer.crc2.fillStyle = this.color;
            Eisdealer.crc2.fill();
            Eisdealer.crc2.strokeStyle = this.color;
            Eisdealer.crc2.stroke();
            // Restore the state to ensure other drawings are not affected
            Eisdealer.crc2.restore();
        }
    }
    Eisdealer.Sauce = Sauce;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Sauce.js.map