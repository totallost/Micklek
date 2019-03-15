import { OrderHeader } from './order-header';

export interface OrderHeaderGlobal {
    allOrderHeaders: OrderHeader[];
    ordersNew: OrderHeader[];
    ordersVerified: OrderHeader[];
    ordersDone: OrderHeader[];
}
