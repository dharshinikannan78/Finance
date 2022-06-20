import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../entities/topglove.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private ProductQualityApi = '';
  // private ProductApi = 'Product';
  // private FileApi = 'Fileupload';
  // private CustomerApi = 'Customer';
  private LoginApi = 'Login';
  private ProductApi = 'Product';
  private CustomerApi = 'Customer';
  private FileApi = 'Fileupload';
  private ProductCustomerApi = 'ProductCustomer';
  private PaymentApi = 'Payment';

  constructor(private http: HttpClient) {
  }


  // getCustomerApiUrl = (endpoint: string) => {
  //   return `${environment.baseURL}/${this.CustomerApi}/${endpoint}`;
  // }

  // FileApiUrl = (endpoint: string) => {
  //   return `${environment.baseURL}/${this.FileApi}/${endpoint}`;
  // }

  // getProductApiUrl = (endpoint: string) => {
  //   return `${environment.baseURL}/${this.ProductApi}/${endpoint}`;
  // }

  loginApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.LoginApi}/${endpoint}`;
  }
  getProductApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.ProductApi}/${endpoint}`;
  }
  getCustomerApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.CustomerApi}/${endpoint}`;
  }
  FileApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.FileApi}/${endpoint}`;
  }
  getProductCustomerApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.ProductCustomerApi}/${endpoint}`;
  }
  getPaymentApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.PaymentApi}/${endpoint}`;
  }


  doLogin = (params: any): Observable<any> => {
    const url = this.loginApiUrl('GetLogin');
    return this.http.post(url, params);
  }
  addUser = (params: any): Observable<any> => {
    const url = this.loginApiUrl('signup');
    return this.http.post(url, params);
  }

  getProductDetails() {
    const url = this.getProductApiUrl('Allproducts')
    return this.http.get(url);
  }

  updateProduct = (params: any): Observable<any> => {
    const url = this.getProductApiUrl('UpdateProduct');
    return this.http.put(url, params);
  }
  deleteProduct = (params: number): Observable<any> => {
    const url = this.getProductApiUrl('DeleteProduct?productId=');
    return this.http.delete(url + params);
  }

  ProductDetail = (id: any): Observable<any> => {
    const url = this.getProductApiUrl('ProductId?id=');
    return this.http.get(url + id);
  }



  insertProduct = (params: any): Observable<any> => {
    const url = this.getProductApiUrl('AddNewProduct');
    return this.http.post(url, params);
  }


  getCustomerDetails() {
    const url = this.getCustomerApiUrl('AllCustomers')
    return this.http.get(url);
  }

  updateCustomer = (params: any): Observable<any> => {
    const url = this.getCustomerApiUrl('UpdateCustomer');
    return this.http.put(url, params);
  }
  deleteCustomer = (params: number): Observable<any> => {
    const url = this.getCustomerApiUrl('DeleteCustomer?customerId=');
    return this.http.delete(url + params);
  }

  updatecustomer = (params: any): Observable<any> => {
    const url = this.getCustomerApiUrl('UpdateCustomer');
    return this.http.put(url, params);
  }

  insertCustomer = (params: any): Observable<any> => {
    const url = this.getCustomerApiUrl('AddNewCustomer');
    return this.http.post(url, params);
  }
  getCustomer = (id: any): Observable<any> => {
    const url = this.getCustomerApiUrl('customerId?id=');
    return this.http.get(url + id);
  }



  fileUpload = (params: any): Observable<any> => {
    const url = this.FileApiUrl('Upload');
    return this.http.post(url, params);
  }

  paymentDetails = (params: any): Observable<any> => {
    const url = this.getPaymentApiUrl('PaymentDetails');
    return this.http.post(url, params);
  }
  insertProductCustomer = (params: any): Observable<any> => {
    const url = this.getProductCustomerApiUrl('AddProductCustomerdetails');
    return this.http.post(url, params);
  }

  getProductCustomer = (): Observable<any> => {
    const url = this.getProductCustomerApiUrl('AllproductCustomer');
    return this.http.get(url);
  }
  ProductCustomer = (id: any): Observable<any> => {
    const url = this.getProductCustomerApiUrl('OrderByProduct?ProductId=');
    return this.http.get(url + id);
  }



}
