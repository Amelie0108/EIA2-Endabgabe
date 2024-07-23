"use strict";
var Eisdealer;
(function (Eisdealer) {
    class OrderText {
        customer;
        text;
        element;
        constructor(customer, text) {
            this.customer = customer;
            this.text = text;
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
        updatePosition() {
            this.element.style.left = `${this.customer.centerX - 50}px`;
            this.element.style.top = `${this.customer.centerY - 70}px`;
        }
        remove() {
            this.element.remove();
            console.log(`OrderText removed for customer at (${this.customer.centerX}, ${this.customer.centerY})`);
        }
    }
    Eisdealer.OrderText = OrderText;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=OrderText.js.map