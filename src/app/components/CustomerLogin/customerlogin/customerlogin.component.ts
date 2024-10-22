import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CustomerDetailsComponent } from '../../CustomerDetails/Customer-Details/Customer-Details.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomerLogin } from '../../../../Interfaces/ICustomerLogin';
import { AuthGuardService } from '../../../../Services/AuthService/AuthGuard.service';

@Component({
  selector: 'app-customerlogin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    CustomerDetailsComponent,
    CommonModule
  ],
  templateUrl: './customerlogin.component.html',
  styleUrls: ['./customerlogin.component.css']
})
export class CustomerloginComponent implements OnInit {
loginForm!: FormGroup;

customerlogin:ICustomerLogin={
  UserName: '',
  Password: ''
}
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authloginservice: AuthGuardService
  ) { }

  ngOnInit() {
    this.validations();
  }

  validations() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      termsandconditions: [false, Validators.requiredTrue]
    });
  }

  onSubmit(){
    if (this.loginForm.valid) {

      this.customerlogin.UserName = this.loginForm.get('username')?.value;
      this.customerlogin.Password = this.loginForm.get('password')?.value;

      console.log('Form Submitted', this.loginForm.value);
      console.log(this.customerlogin);

        this.authloginservice.login(this.customerlogin).subscribe(res => {
        console.log(res)
        if(res.Token){
          
          this.customerlogin = res;
          this.authloginservice.storetoken(res.Token);

          if (res.RefreshToken) {
            this.authloginservice.storetoken(res.RefreshToken); // Store the refresh token
          }
          this.router.navigate(['/userhome'])
        }
        else {
          console.error('Token not found in the response', res);
        }
        (error: any) => {
          console.error('Login request failed', error);
        } 
      });
    }
  }

  onClear(): void {
    this.loginForm.reset();
  }

}
