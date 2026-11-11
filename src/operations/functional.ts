import type { Product, ProductCategory } from '../interfaces/product.js';




//  * Calculates the total monetary value of the inventory(sum of price * quantity).
//  * Time Complexity: O(n)
export function calculateInventoryValue(products: readonly Product[]): number {
    return products.reduce((sum, p) => sum + p.price * p.quantity, 0);
}

// Filters products whose stock quantity is less than or equal to their reorder level.
// Time Complexity: O(n)
export function getLowStockProducts(products: readonly Product[]): Product[] {
    return products.filter((p) => p.quantity <= p.reorderLevel);
}

//  Returns the top 5 highest value products (price * quantity) without mutating the input.
//  Time Complexity: O(n log n)
export function getTopProductsByValue(products: readonly Product[]): Product[] {
    return products
        .toSorted((a, b) => b.price * b.quantity - a.price * a.quantity)
        .slice(0, 5);
}

//   Collects all unique tags across all products using flatMap and Set.
//   Time Complexity: O(n * m) where n is products count and m is average tags per product.
export function getAllTags(products: readonly Product[]): string[] {
    return [...new Set(products.flatMap((p) => p.tags))];
}


//   Maps products array to an array of their names.
//   Time Complexity: O(n)
export function getProductNames(products: readonly Product[]): string[] {
    return products.map((p) => p.name);
}

//   Groups products by category using native Object.groupBy.
//   Time Complexity: O(n)
export function groupByCategoryNative(products: readonly Product[]): Partial<Record<ProductCategory, Product[]>> {
    return Object.groupBy(products, (p) => p.category);
}


//  Groups products by category using a manual reduce approach with proper generics.
//  Time Complexity: O(n)
export function groupByCategoryReduce(products: readonly Product[]): Partial<Record<ProductCategory, Product[]>> {
    return products.reduce<Partial<Record<ProductCategory, Product[]>>>((acc, p) => {
        const group = acc[p.category] ?? [];
        group.push(p);
        acc[p.category] = group;
        return acc;
    }, {});
}

// Concatenates product names in reverse order (right-to-left) using reduceRight.
//  Uses string | undefined accumulator to safely handle empty arrays and empty names.
//  Time Complexity: O(n)
export function getProductNamesInReverseString(products: readonly Product[]): string {
    return (
        products.reduceRight<string | undefined>((acc, p) => {
            if (acc === undefined) {
                return p.name;
            }
            return `${acc}, ${p.name}`;
        }, undefined) ?? ''
    );
}