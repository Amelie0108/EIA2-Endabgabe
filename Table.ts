namespace Eisdealer {

    export class Table {
        public positionX: number;
        public positionY: number;
        public radius: number;
        public color: string;
        

    
        constructor(_x: number, _y: number, _radius: number, _color: string) {
            this.positionX = _x;
            this.positionY = _y;
            this.radius= _radius;
            this.color = _color; 
            
        }

        public draw(): void {
            crc2.save();
            crc2.translate(this.positionX, this.positionY);

            crc2.fillStyle = this.color;
            crc2.beginPath();
            crc2.arc(0, 0, this.radius, 0, Math.PI * 2);
            crc2.fill();

            crc2.restore();
        }
}
}