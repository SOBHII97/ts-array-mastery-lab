export type MovementType = 'IN' | 'OUT';

export interface StockMovement {
    readonly id: string;
    readonly productId: string;
    type: MovementType;
    quantity: number;
    timestamp: Date;
    note?: string;
}