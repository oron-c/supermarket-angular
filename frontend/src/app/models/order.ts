export class Order {
    constructor(
        public userId: number,
        public cartId: number,
        public cartPrice: number,
        public shippingCity: string,
        public shippingStreet: string,
        public shippingDate: string,
        public orderDate: string,
        public creditCardLast4: number,
    ) {}
}