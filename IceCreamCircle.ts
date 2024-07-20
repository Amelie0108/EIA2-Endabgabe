namespace Eisdealer {

    export class IceCreamCircle {
        public centerX: number;
        public centerY: number;
        public radius: number;
        public color: string;
        public category: string;
        public index: number;
    
        constructor(_x: number, _y: number, _radius: number, _color: string, _category: string, _index: number) {
            this.centerX = _x;
            this.centerY = _y;
            this.radius = _radius;
            this.color = _color;
            this.category = _category;
            this.index = _index;
        }

       
        public draw(): void {
            // Draw the ice cream circle
            crc2.beginPath();
            crc2.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2, true);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.strokeStyle = "black"; // Ensure border color is black
            crc2.stroke();
        }
    }
}