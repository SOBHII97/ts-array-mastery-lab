import type { Product } from "../interfaces/product.js";

/**
 * Adds a new product to the end of the products array immutably.
 *
 * @param products - Readonly array of current products.
 * @param newProduct - Product to add.
 * @returns A new readonly array containing all previous products plus the new product at the end.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Cost & Memory Comparison vs Phase 2 (push):
 * - Phase 2 (push) runs in O(1) amortized time and O(1) auxiliary space because it mutates the array in place.
 * - This immutable version creates a full shallow copy of size (n + 1). The O(n) time and memory overhead
 *   is the cost of preserving immutability and preventing side-effects on the source data.
 */
export function addProductImmutable(
    products: readonly Product[],
    newProduct: Product
): readonly Product[] {
    return [...products, newProduct];
}

/**
 * Adds a high-priority/urgent product to the beginning of the products array immutably.
 *
 * @param products - Readonly array of current products.
 * @param urgentProduct - Product to prepend.
 * @returns A new readonly array with the urgent product inserted at index 0.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Cost & Memory Comparison vs Phase 2 (unshift):
 * - Phase 2 (unshift) modifies the array in-place, shifting elements without allocating a new array container.
 * - This immutable version runs in O(n) time and allocates a new array of size (n + 1).
 */
export function receiveUrgentImmutable(
    products: readonly Product[],
    urgentProduct: Product
): readonly Product[] {
    return [urgentProduct, ...products];
}

/**
 * Removes a product by ID immutably and returns both the removed product and the new array.
 *
 * @param products - Readonly array of current products.
 * @param id - Unique identifier of the product to remove.
 * @returns An object containing the removed product (or undefined) and the new readonly product array.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Cost & Memory Comparison vs Phase 2 (splice):
 * - Phase 2 (splice) modifies the original array in-place in O(n) time and O(1) space.
 * - This immutable version uses `toSpliced` after finding the index, creating a new array copy of size (n - 1)
 *   while maintaining the original input reference untouched.
 */
export function removeProductImmutable(
    products: readonly Product[],
    id: string
): { removedProduct: Product | undefined; updatedProducts: readonly Product[] } {
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
        return {
            removedProduct: undefined,
            updatedProducts: products, // Structural sharing: returns the exact same readonly reference safely
        };
    }

    const removedProduct = products[index];
    const updatedProducts = products.toSpliced(index, 1);

    return {
        removedProduct,
        updatedProducts,
    };
}

/**
 * Dispatches (removes) the first product order in the queue immutably.
 *
 * @param products - Readonly array of current products.
 * @returns An object containing the dispatched product (or undefined if empty) and the remaining products readonly array.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Cost & Memory Comparison vs Phase 2 (shift):
 * - Phase 2 (shift) mutates the array in-place.
 * - This immutable version uses `at(0)` and `slice(1)` to create a fresh sub-array in O(n) time and O(n) space.
 */
export function dispatchNextOrderImmutable(
    products: readonly Product[]
): { dispatchedProduct: Product | undefined; remainingProducts: readonly Product[] } {
    const dispatchedProduct = products.at(0);
    const remainingProducts = products.slice(1);

    return {
        dispatchedProduct,
        remainingProducts,
    };
}

/**
 * Reverts (removes) the last received product in the inventory immutably.
 *
 * @param products - Readonly array of current products.
 * @returns An object containing the undone product (or undefined if empty) and the remaining products readonly array.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Cost & Memory Comparison vs Phase 2 (pop):
 * - Phase 2 (pop) removes the last element in-place.
 * - This immutable version uses `at(-1)` and `slice(0, -1)` which takes O(n) time and O(n) memory to copy the sliced elements.
 */
export function undoLastReceiptImmutable(
    products: readonly Product[]
): { undoneProduct: Product | undefined; remainingProducts: readonly Product[] } {
    const undoneProduct = products.at(-1);
    const remainingProducts = products.slice(0, -1);

    return {
        undoneProduct,
        remainingProducts,
    };
}

/**
 * Updates the quantity of a target product by ID immutably.
 *
 * @param products - Readonly array of current products.
 * @param id - Unique identifier of the product.
 * @param newQuantity - New quantity value to set.
 * @returns A new readonly array with the updated product quantity, or original array reference if product is not found.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Cost & Memory Comparison vs Phase 2 (direct index mutation):
 * - Phase 2 has no direct equivalent; the closest is mutating an element in place (products[i].quantity = x).
 * - This immutable version uses `with(index, updatedProduct)` to return a shallow copy of the array with the new reference at `index`, consuming O(n) space.
 */
export function updateQuantityImmutable(
    products: readonly Product[],
    id: string,
    newQuantity: number
): readonly Product[] {
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
        return products;
    }

    // Logically unreachable after a successful findIndex, but required by TypeScript's noUncheckedIndexedAccess rule
    const existingProduct = products[index];
    if (existingProduct === undefined) {
        return products;
    }

    const updatedProduct: Product = {
        ...existingProduct,
        quantity: newQuantity,
    };

    return products.with(index, updatedProduct);
}

/**
 * Sorts products by price immutably in ascending or descending order.
 *
 * @param products - Readonly array of current products.
 * @param ascending - Direction of sorting (true for ascending, false for descending). Defaults to true.
 * @returns A new sorted readonly product array without mutating the original input.
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 *
 * Cost & Memory Comparison vs Phase 2 (sort in-place):
 * - Phase 2 (sort) mutates array elements in-place with O(n log n) time and O(n) worst-case auxiliary memory.
 * - This immutable version uses `toSorted` which copies the array first before performing Timsort, using O(n log n) time and O(n) space.
 */
export function sortProductsByPriceImmutable(
    products: readonly Product[],
    ascending: boolean = true
): readonly Product[] {
    return products.toSorted((a, b) =>
        ascending ? a.price - b.price : b.price - a.price
    );
}