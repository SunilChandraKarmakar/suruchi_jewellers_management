import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response-model';
import { CustomerCreateModel } from '../models/customer/customer-create-model';
import { CustomerUpdateModel } from '../models/customer/customer-update-model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private appBaseUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  // Get customers
  getAllAsync(): Observable<ResponseModel> {   
    const getAllAsyncUrl: string = `${this.appBaseUrl}customer/getAll`;
    let getCustomers: Observable<ResponseModel> = this.httpClient.get<ResponseModel>(getAllAsyncUrl);

    return getCustomers;
  }

  // Get customer by id
  getByIdAsync(id: number): Observable<ResponseModel> {   
    const getByIdAsyncUrl: string = `${this.appBaseUrl}customer/getById/${id}`;
    let getCustomer: Observable<ResponseModel> = this.httpClient.get<ResponseModel>(getByIdAsyncUrl);

    return getCustomer;
  }

  // Create customer
  createAsync(createModel: CustomerCreateModel): Observable<ResponseModel> {
    const createAsyncUrl: string = `${this.appBaseUrl}customer/create`;
    let createCustomer: Observable<ResponseModel> = this.httpClient.post<ResponseModel>(createAsyncUrl, createModel);

    return createCustomer;
  }

  // Update customer
  updateAsync(id: number, updateModel: CustomerUpdateModel): Observable<ResponseModel> {
    const updateAsyncUrl: string = `${this.appBaseUrl}customer/update/${id}`;
    let updateCustomer: Observable<ResponseModel> = this.httpClient.put<ResponseModel>(updateAsyncUrl, updateModel);

    return updateCustomer;
  }  

  // Delete customer by id
  deleteAsync(id: number): Observable<ResponseModel> {
    const deleteAsyncUrl: string = `${this.appBaseUrl}customer/delete/${id}`;
    let deleteCustomer: Observable<ResponseModel> = this.httpClient.delete<ResponseModel>(deleteAsyncUrl);

    return deleteCustomer;
  }  
}