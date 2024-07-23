namespace Eisdealer {

export class OrderText {
    private element: HTMLDivElement;

    constructor(private customer: Customer, private text: string) {
        this.element = document.createElement("div");
        this.element.className = "order-text";
        this.element.style.position = "absolute";
        this.element.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        this.element.style.border = "2px solid rgb(62, 147, 164)";
        this.element.style.padding = "5px";
        this.element.style.fontSize = "14px";
        this.element.style.fontFamily = "Arial, sans-serif";
        this.element.style.zIndex = "1000";
        this.element.textContent = text;

        document.body.appendChild(this.element);
        this.updatePosition();
        console.log(`OrderText created for customer at (${this.customer.centerX}, ${this.customer.centerY}) with text: "${this.text}"`);
    }

    public updatePosition(): void {
        this.element.style.left = `${this.customer.centerX - 50}px`;
        this.element.style.top = `${this.customer.centerY - 70}px`;
    }

    public remove(): void {
        this.element.remove();
        console.log(`OrderText removed for customer at (${this.customer.centerX}, ${this.customer.centerY})`);
    }
}
}