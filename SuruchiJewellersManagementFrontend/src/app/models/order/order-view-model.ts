import { OrderDetailsViewModel } from "../order-details/order-details-view-model";

export class OrderViewModel {
    id: number;
    customerName: string;
    orderNumber: string;
    vori: string;
    ana: string;
    roti: string;
    productOptionName: string;
    amount: string;
    date: string;

    orderDetailsViewModels: OrderDetailsViewModel[] = [];
}