import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor(public notificationService: NotificationService,
    private router: Router,
    private modal: ModalController,
    private apiService: ApiService,
    private toast: NotificationService,
    private loadingService: LoadingService,
    private userService: UserService,
    private fb: FormBuilder) {
    this.generatePaymentForm();
    this.getProductCustomer();
    this.getDetails();
    this.customerList()
    this.getCustomerDetail();    
  }

  isStatus: boolean = true;
  productDetails: any;
  _data: any;
  productCustomer: any;

  currentUser: string = localStorage.getItem('userName');
  // PaymentId: string = localStorage.getItem('PaymentId')
  // role: string = localStorage.getItem('Role')
  PaymentId: any = localStorage.getItem('productCustomerId')
  paymentForm: FormGroup
  customerData: any;

  getProductCustomer() {
    this.apiService.getProductCustomer().subscribe((data: any) => {
      this.productCustomer = data
      console.log(data, 'datas')

    })
    // this.router.navigate(['tabs/tab4'])
  }
  getCustomerDetail = () => {
    this.apiService.getCustomerDetails().subscribe(data => {
      this.customerData = data;
      console.log(this._data);
    });
  }
  payDetails(data: any) {
    console.log(data, 'data');
    this.userService.PaymentId = data;
    this.apiService.ProductCustomer(data).subscribe((data: any) => {
    })
    this.router.navigate(['tabs/tab4']);
  }

  getDetails() {
    this.apiService.getProductDetails().subscribe((data: any) => {
      this.productDetails = data;
    });
  }


  customerDetailsList: any

  customerList() {
    let pId = localStorage.getItem('productId')
    this.apiService.ProductCustomer(pId).subscribe((data: any) => {
      console.log(data, "salman")
      this.customerDetailsList = data
    })

  }


  generatePaymentForm = () => {
    this.paymentForm = this.fb.group({
      //paymentId:[''],
      productCustomerId: [this.PaymentId],
      paymentType: ['', Validators.required],
      paymentDate: [moment().format()],
      paidAmount: ['', Validators.required],
      collectedBy: [this.currentUser],
    });
  }
  thisFormValid() {
    if (this.paymentForm.valid) {
      return true
    } else {
      return false
    }
  }
  pay() {
    console.log(this.paymentForm.value, 'form values')
    this.apiService.paymentDetails(this.paymentForm.value).subscribe(data => {
      this.notificationService.success('Paid successfully')
      console.log(data);
    });
    this.modal.dismiss();
  }

  getPay() {
    this.isStatus = true
  }
}
