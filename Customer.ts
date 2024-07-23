namespace Eisdealer{

    export class Customer {

        public centerX: number;
        public centerY: number;
        public radius: number;
        public color: string;
        private lastInteraction: number;
        private isHappy: boolean;

        constructor(_x: number, _y: number, _radius: number, _color: string) {
            this.centerX = _x;
            this.centerY = _y;
            this.radius = _radius;
            this.color = _color;
            this.lastInteraction = Date.now();
            this.isHappy = true;

            // Set an interval to check the inaction time
            setInterval(this.checkInactivity.bind(this), 1500);
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

            // Draw mouth based on isHappy state
            crc2.beginPath();
            if (this.isHappy) {
                crc2.arc(this.centerX, this.centerY + 5, 14, 0, Math.PI, false);
            } else {
                crc2.arc(this.centerX, this.centerY + 15, 14, 0, Math.PI, true);
            }
            crc2.stroke();
        }

        public interact(): void {
            this.lastInteraction = Date.now();
            this.isHappy = true;
        }

        private checkInactivity(): void {
            const currentTime = Date.now();
            if (currentTime - this.lastInteraction > 20000) {
                this.isHappy = false;
            }
        }
    }
}