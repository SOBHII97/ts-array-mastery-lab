import { describe, expect, it } from 'vitest';
import { generateSeedProducts } from '../src/data/seed.js';
import {
    findProductById,
    findProductBySku,
    findLowStockIndex,
    findLastInCategory,
    hasTag,
    hasLowStock,
    isOrderFulfillable,
} from '../src/operations/search.js';
import type { OrderItem } from '../src/interfaces/order.js';

describe('Search & Query Operations (Read-Only)', () => {
    it('finds a product by its ID or returns undefined', () => {
        const products = generateSeedProducts(5);
        const targetId = products[2]!.id;

        const found = findProductById(products, targetId);
        expect(found).toBeDefined();
        expect(found?.id).toBe(targetId);

        const missing = findProductById(products, 'non-existent-id');
        expect(missing).toBeUndefined();

        // Empty array test
        expect(findProductById([], targetId)).toBeUndefined();
    });

    it('finds a product by its SKU or returns undefined', () => {
        const products = generateSeedProducts(5);
        const targetSku = products[1]!.sku;

        const found = findProductBySku(products, targetSku);
        expect(found).toBeDefined();
        expect(found?.sku).toBe(targetSku);

        const missing = findProductBySku(products, 'SKU-FAKE-999');
        expect(missing).toBeUndefined();

        // Empty array test
        expect(findProductBySku([], targetSku)).toBeUndefined();
    });

    it('finds the first low stock index using findIndex', () => {
        const products = generateSeedProducts(5).map((p) => ({ ...p, quantity: 100, reorderLevel: 10 }));
        products[2] = { ...products[2]!, quantity: 2 };
        expect(findLowStockIndex(products)).toBe(2);
    });

    it('returns -1 when no product is low on stock', () => {
        const products = generateSeedProducts(5).map((p) => ({ ...p, quantity: 100, reorderLevel: 10 }));
        expect(findLowStockIndex(products)).toBe(-1);
    });

    it('finds the last product in a specific category using findLast', () => {
        const products = generateSeedProducts(10);
        const last = findLastInCategory(products, 'electronics');
        expect(last).toBeDefined();
        expect(last?.category).toBe('electronics');
        const all = products.filter((p) => p.category === 'electronics');
        expect(last).toBe(all[all.length - 1]);
    });

    it('checks if a product has a specific tag using includes', () => {
        const product = generateSeedProducts(1)[0]!;
        expect(hasTag(product, 'warehouse')).toBe(true);
        expect(hasTag(product, 'non-existent-tag')).toBe(false);
    });

    it('checks if inventory has any low stock items using some', () => {
        const products = generateSeedProducts(5).map((p) => ({ ...p, quantity: 100, reorderLevel: 10 }));
        expect(hasLowStock(products)).toBe(false);

        products[0] = { ...products[0]!, quantity: 1 };
        expect(hasLowStock(products)).toBe(true);
    });

    it('returns false for an empty inventory', () => {
        expect(hasLowStock([])).toBe(false);
    });

    it('validates if an order is fulfillable using every with duplicate handling and edge cases', () => {
        const products = generateSeedProducts(5).map((p) => ({ ...p, quantity: 10, reorderLevel: 5 }));

        const validOrder: readonly OrderItem[] = [
            { productId: products[0]!.id, quantity: 5, priceAtPurchase: 10 },
            { productId: products[1]!.id, quantity: 5, priceAtPurchase: 15 },
        ];

        const invalidOrder: readonly OrderItem[] = [
            { productId: products[0]!.id, quantity: 15, priceAtPurchase: 10 },
        ];

        const duplicateOrder: readonly OrderItem[] = [
            { productId: products[0]!.id, quantity: 6, priceAtPurchase: 10 },
            { productId: products[0]!.id, quantity: 5, priceAtPurchase: 10 }, // total 11 > 10 available
        ];

        const missingProductOrder: readonly OrderItem[] = [
            { productId: 'non-existent', quantity: 1, priceAtPurchase: 10 },
        ];

        const zeroQuantityOrder: readonly OrderItem[] = [
            { productId: products[0]!.id, quantity: 0, priceAtPurchase: 10 },
        ];

        expect(isOrderFulfillable(products, validOrder)).toBe(true);
        expect(isOrderFulfillable(products, invalidOrder)).toBe(false);
        expect(isOrderFulfillable(products, duplicateOrder)).toBe(false);
        expect(isOrderFulfillable(products, missingProductOrder)).toBe(false);
        expect(isOrderFulfillable(products, zeroQuantityOrder)).toBe(false);
        expect(isOrderFulfillable(products, [])).toBe(true);
    });

    it('search operations do not mutate the array (Read-Only)', () => {
        const products = generateSeedProducts(5);
        const snapshot = structuredClone(products);

        findProductById(products, products[0]!.id);
        findLowStockIndex(products);
        hasLowStock(products);
        findLastInCategory(products, 'home');

        expect(products).toEqual(snapshot);
    });
});