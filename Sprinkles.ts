namespace Eisdealer {

    export class Sprinkle {
        public centerX: number;
        public centerY: number;
        public color: string;
        public category: string;
        public index: number;
        public offsetX: number;
        public offsetY: number;

        constructor(_x: number, _y: number, _color: string, _category: string, _index: number) {
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

        public draw(): void {
            // Save the current state
            crc2.save();

            // Draw sprinkles based on color
            crc2.fillStyle = this.color;
            if (this.color === "#583E26") { // Chocolate Sprinkles
                crc2.fillRect(this.centerX + this.offsetX, this.centerY + this.offsetY, 3, 8); // Adjust size as needed
            } else if (this.color === "#F2A60A") { // Star Sprinkles
                crc2.beginPath();
                crc2.moveTo(this.centerX + this.offsetX, this.centerY + this.offsetY);
                crc2.lineTo(this.centerX + this.offsetX + 5, this.centerY + this.offsetY + 15);
                crc2.lineTo(this.centerX + this.offsetX + 10, this.centerY + this.offsetY);
                crc2.lineTo(this.centerX + this.offsetX, this.centerY + this.offsetY + 10);
                crc2.lineTo(this.centerX + this.offsetX + 10, this.centerY + this.offsetY + 10);
                crc2.closePath();
                crc2.fill();
            }

            // Restore the state to ensure other drawings are not affected
            crc2.restore();
        }
    }
}