import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  productIds: any;
  _data: any
  isDisabled: boolean = true;
  customerForm: FormGroup
  updateForm: FormGroup
  signupForm: FormGroup
  currentUser: string = localStorage.getItem('userName');
  superUser: string = localStorage.getItem('isSuperUser');
  productId: any = localStorage.getItem('productId');
  customerId: any = localStorage.getItem('customerId');
  role: string = localStorage.getItem('Role');
  productDetails: any;
  productCustomer: any


  constructor(public modalController: ModalController,
    public notificationService: NotificationService,
    private router: Router,
    private apiService: ApiService,
    private toast: NotificationService,
    private loadingService: LoadingService,
    private userService: UserService,
    private fb: FormBuilder) {
    this.generateDetails();
    this.generateSignupForm();
    this.generateCustomerForm();
    this.getCustomerDetail();
    this.generateProductCustomer();
  }
  ngOnInit(): void {
  }

  getCustomerDetail = () => {
    this.apiService.getCustomerDetails().subscribe(data => {
      this._data = data;
      console.log(this._data);
    });
  }

  generateProductCustomer = () => {
    this.productCustomer = this.fb.group({
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
  saveProductcustomerDetail(loginForm: any) {
    this.apiService.insertProductCustomer(this.productCustomer.value).subscribe((data: any) => {
    });
    this.modalController.dismiss();
    this.getCustomerDetail();
  }

  generateCustomerForm = () => {
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
      guarantorName: ['', Validators.required],
      address: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      aadharNumber: ['', Validators.required],
      referredBy: ['', Validators.required],
      fileUpload: [''],
      createdBy: [this.currentUser],
      dateOfCreated: [moment().format()]

    });
  }

  getProduct(data: any) {
    this.apiService.getProductDetails().subscribe((data: any) => {
      this.productId = data;
    })
  }


  getCustomerDetails(data: any) {
    this.userService.customer = data;
    this.apiService.getCustomer(data).subscribe((datas: any) => {
      console.log(datas, 'geetha')
      console.log(this.userService.Product, 'data')
      this.router.navigate(['tabs/tab3']);
    });

  }

  generateSignupForm = () => {
    this.signupForm = this.fb.group({
      userName: [''],
      password: [''],
      role: ['']
    });
  }

  generateDetails = () => {
    this.updateForm = this.fb.group({
      customerId: [''],
      customerName: [''],
      guarantorName: [''],
      address: [''],
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      aadharNumber: [''],
      referredBy: ['',],
      fileUpload: [''],
      createdBy: [''],
      dateOfCreated: [''],
      modifiedBy: [this.currentUser],
      dateOfModified: [moment().format()]

    });

  }

  signup() {
    console.log(this.signupForm.value, 'form values')
    this.apiService.addUser(this.signupForm.value).subscribe(data => {
      this.userService.User = data.userName;
      console.log(data);
    });
  }

  updateCustomer() {
    this.apiService.updateCustomer(this.updateForm.value).subscribe(data => {
      console.log(data);
      this.isDisabled = true;
      this.modalController.dismiss();
    });
  }
  deleteCustomer(params: any) {
    this.apiService.deleteCustomer(params).subscribe(data => {
      this.toast.success('Deleted Successfully');
      window.location.reload();
    });
  }


  validateNumber(e) {
    const keyCode = e.keyCode;
    if (((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) && e.keyCode != 8) {
      e.preventDefault();
    }
  }

  thisFormValid() {
    if (this.customerForm.valid) {
      return true
    } else {
      return false
    }
  }

  save() {
    console.log(this.customerForm.value, 'form values')
    this.apiService.insertCustomer(this.customerForm.value).subscribe(data => {
      this.notificationService.success('Customer details saved successfully')
      this.modalController.dismiss();
      console.log(data);
      this.getCustomerDetail();
    });
  }

  changeStatus() {
    this.isDisabled = !(this.isDisabled);
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
    });
  }
}