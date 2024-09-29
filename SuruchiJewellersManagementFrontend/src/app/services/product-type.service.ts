import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response-model';
import { ProductTypeCreateModel } from '../models/product-type/product-type-create-model';
import { ProductTypeUpateModel } from '../models/product-type/product-type-update-model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class ProductTypeService {

  private appBaseUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  // Get product types
  getAllAsync(): Observable<ResponseModel> {   
    const getAllAsyncUrl: string = `${this.appBaseUrl}productType/getAll`;
    let getProductTypes: Observable<ResponseModel> = this.httpClient.get<ResponseModel>(getAllAsyncUrl);

    return getProductTypes;
  }

  // Get product type by id
  getByIdAsync(id: number): Observable<ResponseModel> {   
    const getByIdAsyncUrl: string = `${this.appBaseUrl}productType/getById/${id}`;
    let getProductType: Observable<ResponseModel> = this.httpClient.get<ResponseModel>(getByIdAsyncUrl);

    return getProductType;
  }

  // Create product type
  createAsync(createModel: ProductTypeCreateModel): Observable<ResponseModel> {
    const createAsyncUrl: string = `${this.appBaseUrl}productType/create`;
    let createProductType: Observable<ResponseModel> = this.httpClient.post<ResponseModel>(createAsyncUrl, createModel);

    return createProductType;
  }

  // Update product type
  updateAsync(id: number, updateModel: ProductTypeUpateModel): Observable<ResponseModel> {
    const updateAsyncUrl: string = `${this.appBaseUrl}productType/update/${id}`;
    let updateProductType: Observable<ResponseModel> = this.httpClient.put<ResponseModel>(updateAsyncUrl, updateModel);

    return updateProductType;
  }  

  // Delete product type by id
  deleteAsync(id: number): Observable<ResponseModel> {
    const deleteAsyncUrl: string = `${this.appBaseUrl}productType/delete/${id}`;
    let deleteProductType: Observable<ResponseModel> = this.httpClient.delete<ResponseModel>(deleteAsyncUrl);

    return deleteProductType;
  } 
}