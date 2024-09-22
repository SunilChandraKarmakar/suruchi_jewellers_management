import { OrderDetailsCreateModel } from "../order-details/order-details-create-model";

export class OrderCreateModel {
    customerId: number;
    orderNumber: string | undefined;
    vori: string | undefined;
    ana: string | undefined; 
    roti: string | undefined;
    productOptionId: number | undefined;
    amount: string | undefined;
    date: string;

    orderDetailsCreateModels: OrderDetailsCreateModel[] = [];
}