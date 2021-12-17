export class CartItem { 
    constructor(
        public cartItemId: number,
        public productId: number,
        public quantity: number,
        public totalPrice: number,
        public cartId: number,
        public productName: string,
        public image: string
    ) {}
}