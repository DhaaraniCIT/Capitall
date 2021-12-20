import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';


@Injectable()
export class ConfigService {

    constructor(private restapi: SharedService) { }

    private loginURL = this.restapi.baseUrlPublic+'/login';
    get loginUrl():string{return this.loginURL}

    private signupURL = this.restapi.baseUrlPublic+'/signup';
    get signupUrl():string{return this.signupURL}

    private getProductURL = this.restapi.baseUrlPublic+'/getProducts';
    get getProductUrl():string{return this.getProductURL}

    private getProductidURL = this.restapi.baseUrlPublic+'/getProducts';
    get getProductidUrl():string{return this.getProductidURL}

    private getProductdetailsidURL = this.restapi.baseUrlPublic+'/getProductdetails';
    get getProductdetailsidUrl():string{return this.getProductdetailsidURL}

    private getSellProductURL = this.restapi.baseUrlPublic+'/getsellProducts';
    get getSellProductUrl():string{return this.getSellProductURL}

    private getpurProductURL = this.restapi.baseUrlPublic+'/getpurProducts';
    get getpurProductUrl():string{return this.getpurProductURL}

    private sellProductURL = this.restapi.baseUrlPublic+'/sellProduct';
    get sellProductUrl():string{return this.sellProductURL}

    private purchaseProductURL = this.restapi.baseUrlPublic+'/purchaseProduct';
    get purchaseProductUrl():string{return this.purchaseProductURL}

}