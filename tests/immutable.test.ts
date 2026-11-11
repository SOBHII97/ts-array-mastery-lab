import { describe, expect, it } from 'vitest';
import type { Product } from '../src/interfaces/product.js';
import {
    addProductImmutable,
    receiveUrgentImmutable,
    removeProductImmutable,
    dispatchNextOrderImmutable,
    undoLastReceiptImmutable,
    updateQuantityImmutable,
    sortProductsByPriceImmutable,
} from '../src/operations/immutable.js';

const make = (id: string, overrides: Partial<Product> = {}): Product => ({
    id,
    sku: `SKU-${id}`,
    name: `Name ${id}`,
    category: 'home',
    price: 10,
    quantity: 1,
    tags: [],
    reorderLevel: 0,
    ...overrides,
});

describe('Immutable Operations (Phase 5)', () => {
    it('addProductImmutable returns a new array with the product at the end', () => {
        const products = [make('1'), make('2')];
        const snapshot = structuredClone(products);

        const result = addProductImmutable(products, make('3'));

        expect(result.map((p) => p.id)).toEqual(['1', '2', '3']);
        expect(result).not.toBe(products);
        expect(products).toEqual(snapshot);
    });

    it('receiveUrgentImmutable returns a new array with the product at the start', () => {
        const products = [make('1'), make('2')];
        const snapshot = structuredClone(products);

        const result = receiveUrgentImmutable(products, make('urgent'));

        expect(result.map((p) => p.id)).toEqual(['urgent', '1', '2']);
        expect(result).not.toBe(products);
        expect(products).toEqual(snapshot);
    });

    it('removeProductImmutable removes the target and returns it', () => {
        const products = [make('1'), make('2'), make('3')];
        const snapshot = structuredClone(products);

        const { removedProduct, updatedProducts } = removeProductImmutable(products, '2');

        expect(removedProduct?.id).toBe('2');
        expect(updatedProducts.map((p) => p.id)).toEqual(['1', '3']);
        expect(products).toEqual(snapshot);
        expect(updatedProducts).not.toBe(products);
    });

    it('removeProductImmutable returns undefined and the same reference when id is missing', () => {
        const products = [make('1')];

        const { removedProduct, updatedProducts } = removeProductImmutable(products, 'nope');

        expect(removedProduct).toBeUndefined();
        expect(updatedProducts).toBe(products);
    });

    it('dispatchNextOrderImmutable returns the first item and the rest', () => {
        const products = [make('1'), make('2'), make('3')];
        const snapshot = structuredClone(products);

        const { dispatchedProduct, remainingProducts } = dispatchNextOrderImmutable(products);

        expect(dispatchedProduct?.id).toBe('1');
        expect(remainingProducts.map((p) => p.id)).toEqual(['2', '3']);
        expect(products).toEqual(snapshot);
    });

    it('dispatchNextOrderImmutable handles an empty array', () => {
        const { dispatchedProduct, remainingProducts } = dispatchNextOrderImmutable([]);
        expect(dispatchedProduct).toBeUndefined();
        expect(remainingProducts).toEqual([]);
    });

    it('undoLastReceiptImmutable returns the last item and the rest', () => {
        const products = [make('1'), make('2'), make('3')];
        const snapshot = structuredClone(products);

        const { undoneProduct, remainingProducts } = undoLastReceiptImmutable(products);

        expect(undoneProduct?.id).toBe('3');
        expect(remainingProducts.map((p) => p.id)).toEqual(['1', '2']);
        expect(products).toEqual(snapshot);
    });

    it('undoLastReceiptImmutable handles an empty array', () => {
        const { undoneProduct, remainingProducts } = undoLastReceiptImmutable([]);
        expect(undoneProduct).toBeUndefined();
        expect(remainingProducts).toEqual([]);
    });

    it('updateQuantityImmutable changes only the target and shares the other references', () => {
        const products = [make('1', { quantity: 5 }), make('2', { quantity: 5 })];
        const snapshot = structuredClone(products);

        const result = updateQuantityImmutable(products, '1', 99);

        expect(result[0]?.quantity).toBe(99);
        expect(result[1]).toBe(products[1]); // structural sharing
        expect(result).not.toBe(products);
        expect(products).toEqual(snapshot);
    });

    it('updateQuantityImmutable returns the same reference when id is missing', () => {
        const products = [make('1')];
        expect(updateQuantityImmutable(products, 'nope', 5)).toBe(products);
    });

    it('sortProductsByPriceImmutable sorts both directions without mutating input', () => {
        const products = [make('a', { price: 30 }), make('b', { price: 10 }), make('c', { price: 20 })];
        const snapshot = structuredClone(products);

        const asc = sortProductsByPriceImmutable(products, true);
        expect(asc.map((p) => p.id)).toEqual(['b', 'c', 'a']);

        const desc = sortProductsByPriceImmutable(products, false);
        expect(desc.map((p) => p.id)).toEqual(['a', 'c', 'b']);

        expect(asc).not.toBe(products);
        expect(products).toEqual(snapshot);
    });
});