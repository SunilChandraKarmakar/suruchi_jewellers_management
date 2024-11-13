import { OrderDetailsPrintModel } from "./order-details-print-model";

export class OrderPrintModel {
    customerName: string;
    orderNumber: string;
    vori: string;
    ana: string;
    roti: string;
    productOptionName: string;
    amount: string;
    date: string;
    amountInWord: string;
    serialNumber: string;

    orderDetailsPrintModel: OrderDetailsPrintModel[] = [];
}