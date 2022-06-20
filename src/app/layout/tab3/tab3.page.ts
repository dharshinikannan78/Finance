import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { UserService } from 'src/app/services/user.service';
import { Factory, WorkStations } from 'src/app/entities/topglove.domain.model';
import { saveAs } from 'file-saver';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Size, TypeOfFormers } from '../../entities/topglove.domain.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  productDetails: any;



  constructor(private toast: NotificationService,
    private loadingService: LoadingService,
    private apiService: ApiService,
    public userService: UserService,
    private router: Router,
    public fb: FormBuilder,
    public notificationService: NotificationService
  ) {
    this.generateLoginForm();
    this.getProductCustomer();
    this.getDetails();
    this.customerList()
    this.getCustomerDetail();
  }
  _data: any;
  customerData: any;
  productCustomer: any;
  attachmentId: any;
  form: any;

  ngOnInit(): void {
    // console.log('geetha')
    // this.apiService.getCustomerDetails().subscribe(data => {
    //   this._data = data;
    //   console.log(this._data, 'geetha');
    // })
  }
  getDetails() {
    this.apiService.getProductDetails().subscribe((data: any) => {
      this.productDetails = data;
    });
  }
  currentUser: string = localStorage.getItem('userName');
  productId: any = localStorage.getItem('productId');
  customerId: any = localStorage.getItem('customerId');
  loginForm: FormGroup

  generateLoginForm = () => {
    this.loginForm = this.fb.group({
      productId: [this.productId],
      customerId: [this.customerId],
      // guarantorName: ['',],
      // address: ['', ],
      // mobileNumber: ['', ],
      // aadharNumber: ['', ],
      // referredBy: ['', ],
      // attachmentId: [''],
      createdBy: [this.currentUser],
      dateOfCreated: [moment().format()],
      // modifiedBy: ['', ],
      // dateOfModified: [moment().format()]
    });

  }




  thisFormValid() {
    if (this.loginForm.valid) {
      return true
    } else {
      return false
    }
  }

  save(loginForm: any) {
    this.apiService.insertProductCustomer(this.loginForm.value).subscribe((data: any) => {
    });
    this.toast.success('Added Successfully');
    this.router.navigate(['/tabs/tab1']);

  }
  validateNumber(e) {
    const keyCode = e.keyCode;
    if (((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) && e.keyCode != 8) {
      e.preventDefault();
    }
  }

  uploadcandidateFile = (fileChangeEvent: any) => {
    console.log(fileChangeEvent, 'geetha')
    const photo = fileChangeEvent.target.files[0];
    console.log(photo, 'geetha')

    const formData = new FormData();
    console.log(formData, 'geetha')

    formData.append('file', photo);
    this.apiService.fileUpload(formData).subscribe((file: any) => {
      console.log(file, 'file')
      this.attachmentId = file.attachmentId;
      // this.attachmentId.push({
      //   attachmentId : file.attachmentId
      // });
      console.log(file.attachmentId, 'this.attachmentId')
      console.log(this.attachmentId, 'this.attachmentId')

      console.log(file, 'file')

    });

  }

  payDetails(data: any) {
    console.log(data, 'data');
    this.userService.PaymentId = data;
    this.apiService.ProductCustomer(data).subscribe((data: any) => {
    })
    this.router.navigate(['tabs/tab4']);
  }

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

  customerDetailsList: any

  customerList() {
    let pId = localStorage.getItem('productId')
    this.apiService.ProductCustomer(pId).subscribe((data: any) => {
      console.log(data, "salman")
      this.customerDetailsList = data
    })

  }

}
