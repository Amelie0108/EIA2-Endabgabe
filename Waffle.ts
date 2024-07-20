namespace Eisdealer{

    export class Waffle {
        public centerX: number;
        public centerY: number;

        constructor(_x: number, _y: number) {
            this.centerX = _x;
            this.centerY = _y;
        }

        public setPosition(_x: number, _y: number): void {
            this.centerX = _x;
            this.centerY = _y;
        }

        public draw(): void {
            crc2.beginPath();
            crc2.moveTo(this.centerX - 40, this.centerY - 50);
            crc2.lineTo(this.centerX, this.centerY + 50);
            crc2.lineTo(this.centerX + 40, this.centerY - 50);
            crc2.closePath();
            crc2.fillStyle = "#D2B48C"; // Waffle color
            crc2.fill();
            crc2.strokeStyle = "black"; // Ensure border color is black
            crc2.stroke();
        }
    }
}