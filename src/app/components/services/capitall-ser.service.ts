import { Injectable } from '@angular/core';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
@Injectable({
  providedIn: 'root'
})
export class CapitallSerService {

  constructor(private apiService: ApiService, private configService: ConfigService) { }

  signup(data:any){
    return this.apiService.post(this.configService.signupUrl,data);
  }

  login(email: string, password: string){
    return this.apiService.post(this.configService.loginUrl,{email,password});
  }

  getProducts(){
    return this.apiService.get(this.configService.getProductUrl)
  }

  getProductsid(id){
    return this.apiService.get(this.configService.getProductidUrl+'/'+id)
  }

  getsellProducts(id){
    return this.apiService.get(this.configService.getSellProductUrl+'/'+id)
  }

  getpurchaseProducts(id){
    return this.apiService.get(this.configService.getpurProductUrl+'/'+id)
  }

  SellProducts(data){
    return this.apiService.post(this.configService.sellProductUrl,data)
  }

  PurchaseProducts(data){
    return this.apiService.post(this.configService.purchaseProductUrl,data)
  }

  getProdetailsByid(id){
    return this.apiService.get(this.configService.getProductdetailsidUrl+'/'+id)
  }
}
