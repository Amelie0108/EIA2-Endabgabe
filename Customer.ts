namespace Eisdealer{

    export class Customer {

        public centerX: number;
        public centerY: number;
        public radius: number;
        public color: string;
        
        constructor(_x: number, _y: number, _radius: number, _color: string) {
            this.centerX = _x;
            this.centerY = _y;
            this.radius= _radius;
            this.color = _color; 

        }

        public draw(): void {
            crc2.beginPath();
            crc2.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2, true);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.strokeStyle = "black"; // Ensure border color is black
            crc2.stroke();

            crc2.beginPath();
            crc2.arc(this.centerX - 10, this.centerY - 10, 4, 0, Math.PI * 2, true);
            crc2.fillStyle = "black";
            crc2.fill();

            crc2.beginPath();
            crc2.arc(this.centerX + 10, this.centerY - 10, 4, 0, Math.PI * 2, true);
            crc2.fillStyle = "black";
            crc2.fill();

            crc2.beginPath();
            crc2.arc(this.centerX, this.centerY + 5, 14, 0, Math.PI, false);
            crc2.stroke();
        }
    }
}

