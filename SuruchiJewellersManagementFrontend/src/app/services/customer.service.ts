import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response-model';
import { CustomerCreateModel } from '../models/customer/customer-create-model';
import { CustomerUpdateModel } from '../models/customer/customer-update-model';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private appBaseUrl: string = "https://localhost:7001/api/";
  constructor(private httpClient: HttpClient) { }

  // Get customers
  getAllAsync(): Observable<ResponseModel> {   
    const getAllAsyncUrl: string = `${this.appBaseUrl}customer/getAll`;
    let getCustomers: Observable<ResponseModel> = this.httpClient.get<ResponseModel>(getAllAsyncUrl);

    return getCustomers;
  }

  getByIdAsync(id: number): Observable<ResponseModel> {   
    const getByIdAsyncUrl: string = `${this.appBaseUrl}customer/getById/${id}`;
    let getCustomer: Observable<ResponseModel> = this.httpClient.get<ResponseModel>(getByIdAsyncUrl);

    return getCustomer;
  }

  createAsync(createModel: CustomerCreateModel): Observable<ResponseModel> {
    const createAsyncUrl: string = `${this.appBaseUrl}customer/create`;
    let createCustomer: Observable<ResponseModel> = this.httpClient.post<ResponseModel>(createAsyncUrl, createModel);

    return createCustomer;
  }

  updateAsync(id: number, updateModel: CustomerUpdateModel): Observable<ResponseModel> {
    const updateAsyncUrl: string = `${this.appBaseUrl}customer/update/${id}`;
    let updateCustomer: Observable<ResponseModel> = this.httpClient.put<ResponseModel>(updateAsyncUrl, updateModel);

    return updateCustomer;
  }  

  deleteAsync(id: number): Observable<ResponseModel> {
    const deleteAsyncUrl: string = `${this.appBaseUrl}customer/delete/${id}`;
    let deleteCustomer: Observable<ResponseModel> = this.httpClient.delete<ResponseModel>(deleteAsyncUrl);

    return deleteCustomer;
  }  
}