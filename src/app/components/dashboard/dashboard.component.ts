import { Component, OnInit } from '@angular/core';
import { CapitallSerService } from '../services/capitall-ser.service'
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  loading=true;
  len: any;
  products: any;
  failure: boolean;
  message: string;
  purchase:any;
  sell:any;
  registerForm: FormGroup;
  sellProducts: any;
  msg: any;
  masg:any;
  purProducts: any;
  nopur:any;Propic='';
  propic: string | ArrayBuffer;
  success=true;
  loading1=true;
  constructor(private service:CapitallSerService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.user = {
      email:localStorage.getItem('userEmail'),
      name:localStorage.getItem('userName'),
      id:localStorage.getItem('userId')
    }
    this.registerForm = this.formBuilder.group({
      name:['',[Validators.required, Validators.pattern('[A-Za-z0-9]*')]],
      category:['',[Validators.required, Validators.pattern('[A-Za-z]*')]],
      price:['',[Validators.required,Validators.pattern('[1-9][0-9]*')]],
      pic:['',[Validators.required]],
    })
    this.getPurchaseList();
    this.getSellList();
  }

  get f() { return this.registerForm.controls; }
  getSellList(){
    this.service.getsellProducts(this.user.id).subscribe(
      result=>{
        if(result.data){
          this.sellProducts = result.data
          this.sell = this.sellProducts.length
          this.loading=false
        }
        else{
          this.msg = result.error;
          this.sell=0
        }
      }
    )
  }

  getPurchaseList(){
    this.service.getpurchaseProducts(this.user.id).subscribe(
      result=>{
        if(result.data){
          this.purProducts = result.data
          this.nopur = this.purProducts.length
          this.loading1=false
        }
        else{
          this.masg = result.error;
          this.nopur = 0
        }
      }
    )
  }

  imageupload(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.propic=reader.result;
    };
  }

  addProduct(){
    let data={
      name:this.f.name.value,
      category:this.f.category.value,
      price:this.f.price.value,
      pic:this.propic,
      id:this.user.id,
    }
    this.service.SellProducts(data).subscribe(
      result=>{
        if(result.data){
          $("#success").modal('show');
          this.success=true
          this.getSellList();
        }
        else{
          $("#success").modal('show');
          this.success=false
        }
      }
    )
  }

}
