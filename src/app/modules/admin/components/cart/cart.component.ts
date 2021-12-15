import { Component, OnInit, ɵɵpureFunction1 } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService } from 'src/app/services/rest.service';
import { User } from '../userdetails/users';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  public usersList:any;
  constructor(private rest:RestService,private cartService : CartService,private _snackbar:MatSnackBar) { }

  loggedInEmail=sessionStorage.getItem('loggedUser');
  userObj:User=new User;
  ngOnInit(): void {
    this.rest.getPolicy().subscribe(
      (res:any)=>{
        this.usersList=res;
        console.log(this.usersList);
        this.function1();
      }
    );
  }
    function1(){
      
      for(let i=0;i<this.usersList.length;i++){
      if(this.usersList[i].email==this.loggedInEmail)
      {

        this.products=this.usersList[i].cart;
        console.log(this.products);
          this.grandTotal = this.cartService.getTotalPrice(this.products);
      }
    }
    }
    toremovecartlist:any=[];
  removeItem(item: any){
    for(let i=0;i<this.usersList.length;i++){
      if(this.usersList[i].email==this.loggedInEmail)
      {
        this.toremovecartlist=this.usersList[i].cart;
        for(let j=0;j<this.usersList[i].cart.length;j++){
          if(this.usersList[i].cart[j]==item)
          {
            this.usersList[i].cart.splice(j,1);
            this.userObj.id=this.usersList[i].id;
            this.userObj.name=this.usersList[i].name;
            this.userObj.loc=this.usersList[i].loc;
            this.userObj.email=this.usersList[i].email;
            this.userObj.phoneno=this.usersList[i].phoneno;
            this.userObj.password=this.usersList[i].password;
            this.userObj.cart=this.usersList[i].cart;
            console.log(this.userObj.cart);
            this.rest.updatePolicy(this.userObj,this.userObj.id).subscribe(res=>{
            })
          }
        }
        console.log(this.toremovecartlist);
      }
    }
    this.cartService.removeCartItem(item,this.toremovecartlist);
  }
  emptycart(){
    for(let i=0;i<this.usersList.length;i++){
      if(this.usersList[i].email==this.loggedInEmail)
      {
        this.userObj.id=this.usersList[i].id;
        this.userObj.name=this.usersList[i].name;
        this.userObj.email=this.usersList[i].email;
        this.userObj.loc=this.usersList[i].loc;
        this.userObj.phoneno=this.usersList[i].phoneno;
        this.userObj.password=this.usersList[i].password;
        this.usersList[i].cart=[];
        this.userObj.cart=this.usersList[i].cart;
        console.log(this.usersList[i].cart);
        this.products=this.usersList[i].cart;
      }
  }
  this.rest.updatePolicy(this.userObj,this.userObj.id).subscribe(res=>{
  })
}

  inc(item :any){

    for(let i=0;i<this.usersList.length;i++){
      if(this.usersList[i].email==this.loggedInEmail)
      {
        this.userObj.id=this.usersList[i].id;
        this.userObj.name=this.usersList[i].name;
        this.userObj.email=this.usersList[i].email;
        this.userObj.loc=this.usersList[i].loc;
        this.userObj.phoneno=this.usersList[i].phoneno;
        this.userObj.password=this.usersList[i].password;
        for(let j=0;j<this.usersList[i].cart.length;j++)
        {
          if(this.usersList[i].cart[j]==item)
          {
            this.usersList[i].cart[j].quantity++;
            this.usersList[i].cart[j].total=this.usersList[i].cart[j].quantity * this.usersList[i].cart[j].price;
          }
          console.log(this.usersList[i].cart[j].quantity,this.usersList[i].cart[j].total);
        }
        this.userObj.cart=this.usersList[i].cart;
        this.rest.updatePolicy(this.userObj,this.userObj.id).subscribe(res=>{
        })
        this.grandTotal = this.cartService.getTotalPrice(this.usersList[i].cart);
      }
    }
    /*
    if(item.aquant>item.quantity)
    {item.quantity++;
      item.total=item.quantity*item.price;
      //console.log(item.total);
      
      this.grandTotal = this.cartService.getTotalPrice();
    }
    else{
      this._snackbar.open("Can't add anymore , the product of Out of stock.","Close", {
        duration:2000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
    });
    }
    */
  }
  dec(item:any){
    for(let i=0;i<this.usersList.length;i++){
      if(this.usersList[i].email==this.loggedInEmail)
      {
        this.userObj.id=this.usersList[i].id;
        this.userObj.name=this.usersList[i].name;
        this.userObj.email=this.usersList[i].email;
        this.userObj.loc=this.usersList[i].loc;
        this.userObj.phoneno=this.usersList[i].phoneno;
        this.userObj.password=this.usersList[i].password;
        for(let j=0;j<this.usersList[i].cart.length;j++)
        {
          if(this.usersList[i].cart[j]==item)
          {
            if(this.usersList[i].cart[j].quantity!=1)
            {
              this.usersList[i].cart[j].quantity--;
              this.usersList[i].cart[j].total=this.usersList[i].cart[j].quantity * this.usersList[i].cart[j].price;
            }
            
          }
          console.log(this.usersList[i].cart[j].quantity,this.usersList[i].cart[j].total);
        }
        this.userObj.cart=this.usersList[i].cart;
        this.rest.updatePolicy(this.userObj,this.userObj.id).subscribe(res=>{
        })
        this.grandTotal = this.cartService.getTotalPrice(this.usersList[i].cart);
      }
  }
}

}
