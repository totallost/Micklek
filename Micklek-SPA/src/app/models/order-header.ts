import { Order } from './order';

export interface OrderHeader {
    id: number;
    numberOfItems: number;
    totalPrice: number;
    clientFirstName: string;
    clientSureName: string;
    clientEmail: string;
    clientCell: string;
    address: string;
    clientRemarks: string;
    orderLines: Order[];
    dateCreation: Date;
    dateTarget: string;
    statusId: number;
}
