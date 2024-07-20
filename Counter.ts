namespace Eisdealer{

    export class Counter {
        public positionX: number;
        public positionY: number;

        constructor(_x: number, _y: number) {
            this.positionX = _x;
            this.positionY = _y;
        }

        public draw(): void {
            crc2.save();
            crc2.translate(this.positionX, this.positionY);
            
            crc2.fillStyle = "#ccc";
            crc2.fillRect(0, 0, 1000, 260);
            crc2.restore();

          

            crc2.restore();
        }
    }
}