import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from './confirmed.validator';
import { CapitallSerService } from '../services/capitall-ser.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;
  submitted=false;
  failure=false;
  message: any;
  constructor(private formBuilder:FormBuilder,private router:Router,private service:CapitallSerService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname:['',[Validators.required, Validators.pattern('[A-Za-z]*')]],
      email:['',[Validators.required, Validators.pattern('^([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.\_\-])([a-zA-Z\.]+)$')]],
      password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirm_password:['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    },{ validator: ConfirmedValidator('password', 'confirm_password')})
  }

  get f() {return this.registerForm.controls;}

  register(){
    let data={
      name:this.f.firstname.value,
      email:this.f.email.value,
      password:this.f.password.value,
    }
    this.service.signup(data).subscribe(
      result=>{
        if (result.data ) {
          localStorage.setItem('userDetails', result);
          result=result.data
          localStorage.setItem('userId', result.UserId);
          localStorage.setItem('userName', result.name);
          // window.sessionStorage.setItem('TOKEN_KEY', result.token);
          this.router.navigate([localStorage.getItem('userName') + '/Dashboard']);
        }
        else if(result.error){
          this.failure=true;
          this.message=result.error;
        }
      }
    )
  }

}
