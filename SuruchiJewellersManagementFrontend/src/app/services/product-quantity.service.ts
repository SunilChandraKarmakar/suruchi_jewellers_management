import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response-model';
import { ProductQuantityCreateModel } from '../models/product-quantity/product-quantity-create-model';
import { ProductQuantityUpdateModel } from '../models/product-quantity/product-quantity-update-model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class ProductQuantityService {
  
  private appBaseUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  // Get product quantities
  getAllAsync(): Observable<ResponseModel> {   
    const getAllAsyncUrl: string = `${this.appBaseUrl}productQuantity/getAll`;
    let getProductQuantities: Observable<ResponseModel> = this.httpClient.get<ResponseModel>(getAllAsyncUrl);

    return getProductQuantities;
  }

  // Get product quantity by id
  getByIdAsync(id: number): Observable<ResponseModel> {   
    const getByIdAsyncUrl: string = `${this.appBaseUrl}productQuantity/getById/${id}`;
    let getProductQuantity: Observable<ResponseModel> = this.httpClient.get<ResponseModel>(getByIdAsyncUrl);

    return getProductQuantity;
  }

  // Create product quantity
  createAsync(createModel: ProductQuantityCreateModel): Observable<ResponseModel> {
    const createAsyncUrl: string = `${this.appBaseUrl}productQuantity/create`;
    let createProductQuantity: Observable<ResponseModel> = this.httpClient.post<ResponseModel>(createAsyncUrl, createModel);

    return createProductQuantity;
  }

  // Update product quantity
  updateAsync(id: number, updateModel: ProductQuantityUpdateModel): Observable<ResponseModel> {
    const updateAsyncUrl: string = `${this.appBaseUrl}productQuantity/update/${id}`;
    let updateProductQuantity: Observable<ResponseModel> = this.httpClient.put<ResponseModel>(updateAsyncUrl, updateModel);

    return updateProductQuantity;
  }  

  // Delete product quantity by id
  deleteAsync(id: number): Observable<ResponseModel> {
    const deleteAsyncUrl: string = `${this.appBaseUrl}productQuantity/delete/${id}`;
    let deleteProductQuantity: Observable<ResponseModel> = this.httpClient.delete<ResponseModel>(deleteAsyncUrl);

    return deleteProductQuantity;
  } 
}