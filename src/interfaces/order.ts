export type OrderPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';

export interface OrderItem {
    readonly productId: string;
    quantity: number;
    priceAtPurchase: number;
}

export interface Order {
    readonly id: string;
    readonly customerId: string;
    items: readonly OrderItem[];
    priority: OrderPriority;
    status: OrderStatus;
    createdAt: Date;
}