export class Cart {
    constructor(
        public cartId: number,
        public userId: number,
        public createDate: string,
        public isActive: number
    ) {}
}