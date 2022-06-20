import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  productDetails: any;
  getProductDetail: any;
  productForm: FormGroup;
  updateForm: FormGroup;
  productId: any;
  isDisabled: boolean = true;
  currentUser: string = localStorage.getItem('userName');
  superUser: string = localStorage.getItem('isSuperUser');
  role: string = localStorage.getItem('Role');
  public segment: string = "list";
  isOpen: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private toast: NotificationService,
    private loadingService: LoadingService,
    public notificationService: NotificationService,
    private userService: UserService,
    private modal: ModalController,
    private fb: FormBuilder) {
    this.generateProductForm();
    this.generateDetails();

  }


  ngOnInit(): void {
    this.getDetails();
  }

  deleteProduct(params: any) {
    this.apiService.deleteProduct(params).subscribe(data => {
      this.toast.success('Deleted Successfully');
      window.location.reload();
    });
  }

  getDetails() {
    this.apiService.getProductDetails().subscribe((data: any) => {
      this.productDetails = data;
    });
  }

  getProductDetails(data: any) {
    this.userService.Product = data;
    this.apiService.ProductDetail(data).subscribe((data: any) => {
      this.getProductDetail = data;
      this.router.navigate(['tabs/tab2']);
    });
  }

  generateProductForm = () => {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productType: ['', Validators.required],
      productTenure: ['', Validators.required],
      noOfCustomers: ['', Validators.required],
      productDescription: ['', Validators.required],
      price: ['', Validators.required],
      createdBy: [this.currentUser],
      dateOfCreated: [moment().date()],
    });
  }

  addProduct() {
    this.apiService.insertProduct(this.productForm.value).subscribe((data: any) => {
      this.productId = data.productId;
      console.log(this.productId, 'productId')
      console.log(data, ' data');
      console.log(data.productId, ' data.productId ');
      this.notificationService.success('Product details saved successfully');
      this.productForm.reset();
      this.modal.dismiss();
      this.getDetails();
    });
  }

  thisFormValid() {
    if (this.productForm.valid) {
      return true
    } else {
      return false
    }
  }
  logout = () => {
    this.apiService.logout();
    this.router.navigate(['./login']);
  }
  validateNumber(e) {
    const keyCode = e.keyCode;
    if (((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) && e.keyCode != 8) {
      e.preventDefault();
    }
  }

  updateProduct(updateForm: any) {
    this.apiService.updateProduct(this.updateForm.value).subscribe(data => {
      console.log(data);
      this.isDisabled = true;
      this.modal.dismiss();
    });

  }

  generateDetails() {
    this.updateForm = this.fb.group({
      productId: [''],
      productName: ['', Validators.required],
      productType: ['', Validators.required],
      productTenure: ['', Validators.required],
      noOfCustomers: ['', Validators.required],
      price: ['', Validators.required],
    })
    // this.apiService.getProductDetails().subscribe((data: any) => {
    //   this.productId = data.productId;
    //   console.log(this.productId, 'productId');
    //   console.log(data.productId, 'productId');
    //   this.productDetails = data;
    //   console.log(this.productDetails);
    // });
  }
  changeStatus() {
    this.isDisabled = !(this.isDisabled);
  }

  paymentDetails(data: any) {
    console.log(data, 'id')
    this.userService.Product = data;
    this.router.navigate(['tabs/tab4'])
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
    console.log(this.segment, 'seg')
  }

  onclick(data) {
    this.isOpen == true;
    console.log(data, 'data')
  }
  getAllCustomerDetails(data: any) {
    console.log(data, 'id')
    this.userService.Product = data;
    this.router.navigate(['tabs/tab2']);
  }
  // ionViewWillEnter(data: any) {
  //   this.paymentDetails(data);
  // }
}