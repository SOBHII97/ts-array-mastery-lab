const items = [3, 1, 2];
const sorted = items.toSorted((a, b) => a - b);
console.log("Smart Warehouse CLI is alive", { items, sorted, last: items.at(-1) });
