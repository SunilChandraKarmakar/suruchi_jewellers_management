import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response-model';
import { OrderCreateModel } from '../models/order/order-create-model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private appBaseUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  // Get orders
  getAllAsync(): Observable<ResponseModel> {   
    const getAllAsyncUrl: string = `${this.appBaseUrl}order/getAll`;
    let getOrders: Observable<ResponseModel> = this.httpClient.get<ResponseModel>(getAllAsyncUrl);

    return getOrders;
  }

  // Create order
  createAsync(createModel: OrderCreateModel): Observable<ResponseModel> {
    const createAsyncUrl: string = `${this.appBaseUrl}order/create`;
    let createOrder: Observable<ResponseModel> = this.httpClient.post<ResponseModel>(createAsyncUrl, createModel);

    return createOrder;
  }

  // Delete customer by id
  deleteAsync(id: number): Observable<ResponseModel> {
    const deleteAsyncUrl: string = `${this.appBaseUrl}order/delete/${id}`;
    let deleteOrder: Observable<ResponseModel> = this.httpClient.delete<ResponseModel>(deleteAsyncUrl);

    return deleteOrder;
  }  
}