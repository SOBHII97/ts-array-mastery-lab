export const PRODUCT_CATEGORIES = ['electronics', 'grocery', 'clothing', 'home', 'toys'] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export interface Product {
    readonly id: string;
    readonly sku: string;
    name: string;
    category: ProductCategory;
    price: number;
    quantity: number;
    tags: readonly string[];
    reorderLevel: number;
}