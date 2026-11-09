import { PRODUCT_CATEGORIES, type Product } from '../interfaces/product.js';


export function generateSeedProducts(count: number = 50): Product[] {
    return Array.from({ length: count }, (_, index) => {
        // index % length is always in range, so the non-null assertion is safe
        const category = PRODUCT_CATEGORIES[index % PRODUCT_CATEGORIES.length]!;

        return {
            id: `prod-${index + 1}`,
            sku: `SKU-${category.substring(0, 3).toUpperCase()}-${String(index + 1).padStart(3, '0')}`,
            name: `Sample Product ${index + 1}`,
            category,
            price: Number((10.99 + ((index * 37) % 90)).toFixed(2)),
            quantity: ((index * 7) % 50) + 1,
            tags: [`tag-${index % 5}`, 'warehouse'],
            reorderLevel: 10,
        };
    });
}