export class Product {
    constructor(
        public productId: number,
        public productName: string,
        public categoryId: number,
        public price: number,
        public image: FileList | any,
    ) {}

    static convertToFormData(product: Product) {
        const fd = new FormData();
        fd.append("productName", product.productName);
        fd.append("categoryId", product.categoryId.toString());
        fd.append("price", product.price.toString());
        if(product.image?.item) {
            fd.append("image", product.image.item(0))
        }
        else {
            fd.append("image", product.image)
        }
        return fd;
    }
}