import { Product } from "../interfaces/product.js";


//Adds a new product to the end of the array.
//Time Complexity: O(1) amortized.
export function addProduct(products: Product[], product: Product): number {
    return products.push(product);
}

//receives urgent product and adds it to very beginnig of any array
//time complexity --> O(n) cuz it shifts all existing elements to right
export function receiveUrgent(products: Product[], product: Product): number {
    return products.unshift(product);
}

//remove product from the array in place using  splice based on its Id
//time complexity O(n) to find the index, plus O(n) to shift elements.
export function removeProduct(products: Product[], productId: string): Product | undefined {
    const index = products.findIndex((p) => p.id === productId);
    if (index === -1) {
        return undefined;
    }
    // Remove 1 element at the found index in place
    const removed = products.splice(index, 1)[0];
    return removed;
}

//dispatches next order by romving first product from array using shift
//time Complexity O(n) because shifting all elements requires re-indexing.
export function dispatchNextOrder(products: Product[]): Product | undefined {
    return products.shift();
}

//Undoes the last receipt by removing the last product from the array using pop.
//time complexity O(1)
export function undoLastReceipt(products: Product[]): Product | undefined {
    return products.pop();
}

//sort product aray in place byprice 
export function sortProductsByPriceInPlace(products: Product[], ascending: boolean = true): Product[] {
    products.sort((a, b) => (ascending ? a.price - b.price : b.price - a.price));
    return products;
}