import { Component, OnInit } from '@angular/core';
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
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(public notificationService: NotificationService,
    private router: Router,
    private modal: ModalController,
    private apiService: ApiService,
    private toast: NotificationService,
    private loadingService: LoadingService,
    private userService: UserService,
    private fb: FormBuilder) {
    this.getDetails();
    this.customerList()
    this.getCustomerDetail();
    this.paymentDetails();


  }

  ngOnInit() {
  }

  customerDetailsList: any;
  productDetails: any;
  customerData: any;
  allPaymentDetails: any;

  customerList() {
    let pId = localStorage.getItem('productId')
    this.apiService.ProductCustomer(pId).subscribe((data: any) => {
      console.log(data, "salman")
      this.customerDetailsList = data
    })
  }
  getDetails() {
    this.apiService.getProductDetails().subscribe((data: any) => {
      this.productDetails = data;
    });
  }

  getCustomerDetail = () => {
    this.apiService.getCustomerDetails().subscribe(data => {
      this.customerData = data;

    });
  }
  paymentDetails() {
    this.apiService.getpaymentDetails().subscribe(data => {
      this.allPaymentDetails = data;
    });
  }
}
