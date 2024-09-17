import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response-model';
import { ProductCreateModel } from '../models/product/product-create-model';
import { ProductUpateModel } from '../models/product/product-update-model';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private appBaseUrl: string = "https://localhost:7001/api/";
  constructor(private httpClient: HttpClient) { }

  // Get products
  getAllAsync(): Observable<ResponseModel> {   
    const getAllAsyncUrl: string = `${this.appBaseUrl}product/getAll`;
    let getProducts: Observable<ResponseModel> = this.httpClient.get<ResponseModel>(getAllAsyncUrl);

    return getProducts;
  }

  // Get product by id
  getByIdAsync(id: number): Observable<ResponseModel> {   
    const getByIdAsyncUrl: string = `${this.appBaseUrl}product/getById/${id}`;
    let getProduct: Observable<ResponseModel> = this.httpClient.get<ResponseModel>(getByIdAsyncUrl);

    return getProduct;
  }

  // Create product
  createAsync(createModel: ProductCreateModel): Observable<ResponseModel> {
    const createAsyncUrl: string = `${this.appBaseUrl}product/create`;
    let createProduct: Observable<ResponseModel> = this.httpClient.post<ResponseModel>(createAsyncUrl, createModel);

    return createProduct;
  }

  // Update product
  updateAsync(id: number, updateModel: ProductUpateModel): Observable<ResponseModel> {
    const updateAsyncUrl: string = `${this.appBaseUrl}product/update/${id}`;
    let updateProduct: Observable<ResponseModel> = this.httpClient.put<ResponseModel>(updateAsyncUrl, updateModel);

    return updateProduct;
  }  

  // Delete product by id
  deleteAsync(id: number): Observable<ResponseModel> {
    const deleteAsyncUrl: string = `${this.appBaseUrl}product/delete/${id}`;
    let deleteProduct: Observable<ResponseModel> = this.httpClient.delete<ResponseModel>(deleteAsyncUrl);

    return deleteProduct;
  } 
}