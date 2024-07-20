namespace Eisdealer {

    export class Sauce {
        public centerX: number;
        public centerY: number;
        public color: string;
        public category: string;
        public index: number;

        constructor(_x: number, _y: number, _color: string, _category: string, _index: number) {
            this.centerX = _x;
            this.centerY = _y + 10;
            this.color = _color;
            this.category = _category;
            this.index = _index;
        }

        public draw(): void {
            // Save the current state
            crc2.save();

            // Draw only the top half of the circle for the sauce
            crc2.beginPath();
            crc2.arc(this.centerX, this.centerY, 20, 0, Math.PI, true);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.strokeStyle = this.color;
            crc2.stroke();

            // Restore the state to ensure other drawings are not affected
            crc2.restore();
        }
    }
}