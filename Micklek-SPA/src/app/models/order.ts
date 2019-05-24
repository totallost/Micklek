import { Item } from './item';

export interface Order {
    orderId: number;
    itemId: number;
    item: Item;
    amount: number;
    lineNumber: number;
    linePrice: number;
}
