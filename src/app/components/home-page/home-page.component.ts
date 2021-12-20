import { Component, OnInit,HostListener } from '@angular/core';
import { Router} from '@angular/router';
import { CapitallSerService } from '../services/capitall-ser.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  headerColor_bk_white = false;
  products: any;
  message: string;
  len: any;
  failure=false;
  loading=true;
  constructor(private router: Router,private service:CapitallSerService) { }

  @HostListener('window:scroll', ['$event'])

onWindowScroll(e) {
  
    if (window.pageYOffset > 64) {
      this.headerColor_bk_white = true;
    } else {
      this.headerColor_bk_white = false;
    }
  }
  ngOnInit(): void {
    this.getProduct()
  }

  Register(){
    this.router.navigate(['./sign-up']);
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
  getProduct(){
    this.service.getProducts().subscribe(
      result=>{
        this.loading=false;
        if(result.data){
          
          this.len = result.data.count 
          this.products = result.data 
        }
        else if(result.error){
          this.failure = true;
          this.message="Something went wrong"
        }
      }
    )
  }
}
