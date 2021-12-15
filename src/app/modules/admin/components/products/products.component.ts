import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '../electronics/store';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { RestService } from 'src/app/services/rest.service';
import { User } from '../userdetails/users';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [NgbRatingConfig],
  styles: [
    `
    .star {
      margin:3px;
      font-size: 1.5rem;
      color: #b0c4de;
    }
    .filled {
      color: #1e90ff;
    }
    `
  ]
})
export class ProductsComponent implements OnInit {

  public totalItem:number=0;
  public productList: Store[]=[];
  public usersList:any;
  itemsList:any=[];
  active!: boolean;
  userObj:User=new User;
  loggedInEmail=sessionStorage.getItem('loggedUser');
  constructor(private rest:RestService,private location: Location,private _snackbar: MatSnackBar,private cartService:CartService,private api:ApiService,config: NgbRatingConfig,private activatedRoute: ActivatedRoute) {
    config.max = 5;
    config.readonly = true;
   }

  idForProductsRouting:string="";
  ngOnInit(){
    this.rest.getPolicy().subscribe(
      (res:any)=>{
        this.usersList=res;
        for(let i=0;i<this.usersList.length;i++)
        {
          if(this.usersList[i].email==this.loggedInEmail)
          {
            this.totalItem=this.usersList[i].cart.length;
            this.itemsList=this.usersList[i].cart;
          }
        }
        
      }
    );
    this.cartService.getProducts()
      .subscribe((res:any) => {
        this.totalItem = res.length;
      })
    
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.idForProductsRouting=Number(param.get('id')).toString();
      if(this.idForProductsRouting!=""){
        console.log(this.idForProductsRouting);
        this.getAllProducts(this.idForProductsRouting);
      }
    });
    this.api.getProduct().subscribe((res: any) => {
      this.productList.forEach((a: any) => {
        Object.assign(a, { quantity: 1,total:a.price });
      });
    });
    
  console.log(this.productList);
  }
  getAllProducts(id:string){
    this.api.getProductById(id).subscribe((res: any) => {
      this.productList.push(res);
      console.log(this.productList);
    });
  }
  addtocart(item: any) {
    for(let i=0;i<this.usersList.length;i++){
      if(this.usersList[i].email==this.loggedInEmail)
      {
        this.userObj.id=this.usersList[i].id;
        this.userObj.name=this.usersList[i].name;
        this.userObj.email=this.usersList[i].email;
        this.userObj.loc=this.usersList[i].loc;
        this.userObj.phoneno=this.usersList[i].phoneno;
        this.userObj.password=this.usersList[i].password;
        this.itemsList.push(item);
        if(this.userObj.cart.length==0){
          this.userObj.cart=this.itemsList;
        }
        else{
          for(let i=0;i<this.itemsList.length;i++){
            this.userObj.cart[length]=this.itemsList[i];
            length++;
          }
        }
        console.log(this.userObj.cart);
      }
      
    }
    this.cartService.addtoCart(item);
    this.rest.updatePolicy(this.userObj,this.userObj.id).subscribe(res=>{
    })

    if (item.aquant === item.quantity) {
      this._snackbar.open("The item is out of stock now, please come back later..", "Close", {
        duration:2000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      this.active = true;
    }
  }
  goBack(): void {
    this.location.back();
  }

}
