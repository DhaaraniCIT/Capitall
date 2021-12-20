import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CapitallSerService } from '../services/capitall-ser.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: any;

  constructor(private formBuilder: FormBuilder,private router:Router,private service:CapitallSerService) { }
  registerForm: FormGroup;
  submitted = false;
  failure = false;
  user: any;
  userName = "PriyankaMoorthy";
  isSend:any;
  errisSend:any;
  clicked:any;
  // private user:SocialUser;
  public authorized: boolean = false;
  // , private socialAuthService: AuthService
  hide=true;

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.\_\-])([a-zA-Z\.]+)$')]],
      password: ['',Validators.required]
    })

  }

  get f() { return this.registerForm.controls; }
  signin() 
  {
    if(this.registerForm.valid)
    {
      this.service.login(this.f.email.value, this.f.password.value).subscribe(
        result => {
          if (result.data) {
            result=result.data
            localStorage.setItem('userEmail', result.email);
            localStorage.setItem('userId', result.userId);
            localStorage.setItem('userName', result.name);
            // window.sessionStorage.setItem('TOKEN_KEY', result.token);
            this.router.navigate([localStorage.getItem('userName') + '/Dashboard']);
          }
          else if(result.error){
            this.message=result.error;
            this.failure=true
          }
        }
      );
    }
  }
}
