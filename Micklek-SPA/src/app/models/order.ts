import { Item } from './item';

export interface Order {
    id: number;
    orderId: number;
    itemId: number;
    item: Item;
    amount: number;
    lineNumber;
}
