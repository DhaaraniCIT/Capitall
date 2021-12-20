import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CapitallSerService } from '../services/capitall-ser.service'

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  loading=true;
  len: any;
  products: any;
  failure: boolean;
  message: string;

  constructor(private service:CapitallSerService,private router: Router) { }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){
    var id = localStorage.getItem('userId')
    this.service.getProductsid(id).subscribe(
      result=>{
        this.loading=false;
        if(result.data){
          
          this.len = result.data.count 
          this.products = result.data 
        }
        else if(result.error){
          this.failure = true;
          this.message=result.error
        }
      }
    )
  }

  buy(i){
    window.sessionStorage.setItem('product',this.products[i].proId)
    if(localStorage.getItem('userId')){
      this.router.navigate(['/Product/'+this.products[i].proId])
    }
    else{
      this.router.navigate(['./sign-in'])
    }
  }
}
