export class OutOfBoundsError extends Error {
    constructor(row: number, col: number) {
        super(`Cell [${row}, ${col}] is outside the grid`);
        this.name = "OutOfBoundsError";
    }
}

export class NegativeQuantityError extends Error {
    constructor(quantity: number) {
        super(`Quantity cannot be negative: ${quantity}`);
        this.name = "NegativeQuantityError";
    }
}

export class InvalidGridStructureError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidGridStructureError";
    }
}