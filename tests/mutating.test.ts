import { describe, expect, it } from 'vitest';
import { generateSeedProducts } from '../src/data/seed.js';
import {
    addProduct,
    receiveUrgent,
    removeProduct,
    dispatchNextOrder,
    undoLastReceipt,
    sortProductsByPriceInPlace,
} from '../src/operations/mutating.js';
import type { Product } from '../src/interfaces/product.js';

describe('Mutating Operations', () => {
    it('adds a product to the end using push - O(1)', () => {
        const products = generateSeedProducts(3);
        const initialLength = products.length;
        const newProduct: Product = {
            id: 'prod-new',
            sku: 'SKU-NEW-001',
            name: 'New Item',
            category: 'electronics',
            price: 50.0,
            quantity: 10,
            tags: ['new'],
            reorderLevel: 5,
        };

        addProduct(products, newProduct);
        expect(products).toHaveLength(initialLength + 1);
        expect(products[products.length - 1]?.id).toBe('prod-new');
    });

    it('receives an urgent product at the beginning using unshift - O(n)', () => {
        const products = generateSeedProducts(3);
        const oldFirstId = products[0]!.id;

        const urgentProduct: Product = {
            id: 'prod-urgent',
            sku: 'SKU-URG-001',
            name: 'Urgent Item',
            category: 'grocery',
            price: 15.0,
            quantity: 5,
            tags: ['urgent'],
            reorderLevel: 2,
        };

        receiveUrgent(products, urgentProduct);
        expect(products).toHaveLength(4);
        expect(products[0]?.id).toBe('prod-urgent');
        expect(products[1]?.id).toBe(oldFirstId);

    });

    it('removes a product in place using splice and returns it', () => {
        const products = generateSeedProducts(5);
        const initialLength = products.length;
        const targetId = products[2]!.id;

        const removed = removeProduct(products, targetId);
        expect(removed).toBeDefined();
        expect(removed?.id).toBe(targetId);
        expect(products).toHaveLength(initialLength - 1);
        expect(products.find((p) => p.id === targetId)).toBeUndefined();
    });

    it('returns undefined when removing a non-existent product', () => {
        const products = generateSeedProducts(5);
        const before = [...products];
        const removed = removeProduct(products, 'non-existent-id');
        expect(removed).toBeUndefined();
        expect(products).toEqual(before);
    });

    it('dispatches the next order using shift', () => {
        const products = generateSeedProducts(3);
        const firstId = products[0]!.id;
        const secondId = products[1]!.id;

        const dispatched = dispatchNextOrder(products);
        expect(dispatched?.id).toBe(firstId);
        expect(products).toHaveLength(2);
        expect(products[0]?.id).toBe(secondId);
    });

    it('returns undefined when dispatching from an empty array', () => {
        expect(dispatchNextOrder([])).toBeUndefined();
    });

    it('undoes the last receipt using pop', () => {
        const products = generateSeedProducts(3);
        const lastId = products[products.length - 1]!.id;
        const previousLastId = products[products.length - 2]!.id;

        const undone = undoLastReceipt(products);
        expect(undone?.id).toBe(lastId);
        expect(products).toHaveLength(2);
        expect(products[products.length - 1]?.id).toBe(previousLastId);
    });

    it('returns undefined when undoing from an empty array', () => {
        expect(undoLastReceipt([])).toBeUndefined();
    });

    it('sorts products by price in place (asc and desc)', () => {
        const products = generateSeedProducts(5);

        // Test Ascending--reference equality
        const resultAsc = sortProductsByPriceInPlace(products, true);
        expect(resultAsc).toBe(products);
        for (let i = 0; i < products.length - 1; i++) {
            expect(products[i]!.price).toBeLessThanOrEqual(products[i + 1]!.price);
        }

        // Test Descending
        const resultDesc = sortProductsByPriceInPlace(products, false);
        expect(resultDesc).toBe(products);
        for (let i = 0; i < products.length - 1; i++) {
            expect(products[i]!.price).toBeGreaterThanOrEqual(products[i + 1]!.price);
        }
    });
});