import type { ProductCategory, Product } from "../interfaces/product.js";
import type { OrderItem } from "../interfaces/order.js";

//Finds a product by its unique ID.
//Time Complexity: O(n)
export function findProductById(products: readonly Product[], id: string): Product | undefined {
    return products.find((p) => p.id === id);
}

//Finds a product by its SKU.
//Time Complexity: O(n)
export function findProductBySku(products: readonly Product[], sku: string): Product | undefined {
    return products.find((p) => p.sku === sku);
}

//Finds the index of the first product that has stock less than or equal to its reorder level.
// Time Complexity: O(n)
export function findLowStockIndex(products: readonly Product[]): number {
    return products.findIndex((p) => p.quantity <= p.reorderLevel);
}

//Find thelast product in a specific category using findlast 
// Time Complexity: O(n)
export function findLastInCategory(products: readonly Product[], category: ProductCategory): Product | undefined {
    return products.findLast((p) => p.category === category);
}

//Checks if a product has a specific tag.
//Time Complexity: O(n) 
export function hasTag(product: Product, tag: string): boolean {
    return product.tags.includes(tag);
}
//Checks if any product in the inventory has stock less than or equal to its reorder level.
//Time Complexity: O(n)
export function hasLowStock(products: readonly Product[]): boolean {
    return products.some((p) => p.quantity <= p.reorderLevel);
}

//Checks if an order can be fully fulfilled based on available stock.
//Note:  empty order returns true by default (vacuous truth of every).
//Time Complexity: O(n+m) where n is product count and m is order item
export function isOrderFulfillable(products: readonly Product[], orderItems: readonly OrderItem[]): boolean {
    // 1. to collect requested quantity for each product
    const requested = new Map<string, number>();

    // loop for each item      
    for (const item of orderItems) {
        if (item.quantity <= 0) {
            return false;
        }
        requested.set(item.productId, (requested.get(item.productId) ?? 0) + item.quantity);
    }
    //checking if we have enough for each producted   
    const byId = new Map(products.map((p) => [p.id, p] as const));

    return [...requested].every(([productId, qty]) => {
        const product = byId.get(productId);
        return product !== undefined && product.quantity >= qty;
    });
}