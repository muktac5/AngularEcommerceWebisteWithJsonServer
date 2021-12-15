import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../modules/admin/components/userdetails/users';
import { RestService } from './rest.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  userObj:User=new User;
  public cartItemList : any =[];
  public cartlist:any=[];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  constructor(private rest:RestService) { }
  getProducts(){
    return this.productList.asObservable();
  }

  filterProducts(){
    console.log(this.productList);

  }

  setProduct(product : any){
    this.cartItemList.push(product);
    this.productList.next(product);
  }

  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice(this.cartItemList);
  }
  getTotalPrice(cartlist:any) : number{
    let grandTotal:number=0;
    console.log(cartlist);
    for(let i=0;i<cartlist.length;i++){
      console.log(cartlist[i].total);
      grandTotal+=cartlist[i].total;
    }
    return grandTotal;
  }
  removeCartItem(product: any,cartlist:any){
    this.cartItemList=cartlist;
    console.log(this.cartItemList);


    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}
