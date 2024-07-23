namespace Eisdealer {

    let currentCustomerIndex = 0;
    let tableNumber = 1;

    export class Table {
        public positionX: number;
        public positionY: number;
        public radius: number;
        public color: string;
        public tableLabel: string; // Variable for the table number

    
        constructor(_x: number, _y: number, _radius: number, _color: string) {
            this.positionX = _x;
            this.positionY = _y;
            this.radius = _radius;
            this.color = _color;
            this.tableLabel = (tableNumber++).toString(); // Set table number and increment

            
            // Hinzufügen des Click-Event-Listeners für diesen Tisch
            this.addClickListener(this.handleTableClick.bind(this));
        }

            public draw(): void {
                crc2.save();
                crc2.translate(this.positionX, this.positionY);
    
                crc2.fillStyle = this.color;
                crc2.beginPath();
                crc2.arc(0, 0, this.radius, 0, Math.PI * 2);
                crc2.fill();
    
                crc2.fillStyle = "black";
                crc2.font = "20px Arial";
                crc2.textAlign = "center";
                crc2.textBaseline = "middle";
                crc2.fillText(this.tableLabel, 0, -this.radius / 2);  // Draw the table number
    
                crc2.restore();
            }
    
            private addClickListener(listener: (event: MouseEvent) => void): void {
                crc2.canvas.addEventListener('click', (event: MouseEvent) => {
                    let rect = crc2.canvas.getBoundingClientRect();
                    let x = event.clientX - rect.left;
                    let y = event.clientY - rect.top;
    
                    if (Math.sqrt((x - this.positionX) ** 2 + (y - this.positionY) ** 2) < this.radius) {
                        listener(event);
                    }
                });
            }
    
            private handleTableClick(event: MouseEvent): void {
                if (currentCustomerIndex >= customers.length) return;
    
                let customer = customers[currentCustomerIndex];
                customer.centerX = this.positionX;
                customer.centerY = this.positionY;
    
                currentCustomerIndex++;
            }
        }
    }