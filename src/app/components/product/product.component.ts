import { Component, OnInit } from '@angular/core';
import { CapitallSerService } from '../services/capitall-ser.service'
import { Location } from '@angular/common';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product={
    Propic:'c',
    Pcategory:'zz',
    Pname: "Bat",
    Pprice: 0,
    proId: 0,
    user:{
      email: 'xx@gmail.com',
      name: 'xx',
      userId: 0
    }
  };
  ispro=true;
  loading=true;

  constructor(private service:CapitallSerService,private location: Location,private router: Router) { }

  ngOnInit(): void {
    this.getProdetails()
  }

  getProdetails(){
    this.service.getProdetailsByid(sessionStorage.getItem('product')).subscribe(
      result=>{
        if(result.data){
          this.product=result.data
          this.loading=false
        }
        else{
          this.ispro=false
        }
      }
    )
  }

  purchase(){
    let data={
      id:localStorage.getItem('userId'),
      proId:this.product.proId
    }
    this.service.PurchaseProducts(data).subscribe(
      result=>{
        if(result.data){
          $("#success").modal('show');
        }
      }
    )
  }

  back(){
    this.location.back();
  }
}
