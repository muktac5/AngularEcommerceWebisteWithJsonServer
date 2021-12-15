import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { RestService } from 'src/app/services/rest.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { User } from '../userdetails/users';
import { any } from 'sequelize/dist/lib/operators';
@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.scss'],
  providers: [NgbRatingConfig],
  styles: [
    `
    .star {
      font-size: 1.5rem;
      color: #b0c4de;
    }
    .filled {
      color: #1e90ff;
    }
    `
  ]
})
export class ElectronicsComponent implements OnInit {
  
  minValue: number = 0;
  maxValue: number = 200000;
  maxarr: number[] = [];
  minarr: number[] = [];
  map = new Map();
  options: Options = {
    floor: 0,
    ceil: 200000,
    translate: (value: number, label: LabelType): string => {

      switch (label) {
        case LabelType.Low:
          this.minarr.push(value);
          return '<b>₹</b>' + value;


        case LabelType.High:
          this.maxarr.push(value);
          return '<b>₹</b>' + value;
        default:
          return '₹' + value;
      }

    }
  }


  showFiller = false;
  public usersList:any;
  public productList: any;
  public filteredProductList: any;
  public colorfilteredlist:any;
  public filterCategory: any;
  public filterPrice: any;
  public totalItem: number = 0;
  searchKey: string = "";
  userObj:User=new User;
  loggedInEmail=sessionStorage.getItem('loggedUser');
  
  active!: boolean;
  public productsLeft: number = 0;
  showProductsLeft!: boolean;
  public minPrice = this.minarr[this.minarr.length - 1];
  public maxPrice = this.maxarr[this.maxarr.length - 1];
  constructor(private rest:RestService,fb:FormBuilder,config: NgbRatingConfig, private auth: AuthService, private _snackbar: MatSnackBar, private api: ApiService, private cartService: CartService) {
    config.max = 5;
    config.readonly = true;
  }

  checkboxarray:any=[
    {
      id:1,
      type:"checkbox",
      color:"Green"
    },
    {
      id:2,
      type:"checkbox",
      color:"White"
    },
    {
      id:3,
      type:"checkbox",
      color:"Black"
    },
    {
      id:4,
      type:"checkbox",
      color:"Yellow"
    },
    {
      id:5,
      type:"checkbox",
      color:"Blue"
    },{
      id:6,
      type:"checkbox",
      color:"Multicolor"
    }
  ]
  ngOnInit(): void {

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
    this.api.getProduct().subscribe((res: any) => {
      this.productList = res;
      this.filterCategory = res;
      this.filteredProductList = res;
      this.colorfilteredlist=res;
      this.productList.forEach((a: any) => {
        Object.assign(a, { quantity: 1,total:a.price });
      });
    });

  }

  
  tempArray:any=[];
  newArray:any=[];

  itemsList:any=[];
  j:number=0;
  l:number=0;
  onChange(e:any){
    if(e.target.checked){
      for(let i=0;i<this.productList.length;i++)
    {
      if(this.productList[i].color === e.target.value.toLowerCase()){
        this.tempArray[this.j]=this.productList[i];
        this.j++;
      }
    }
    
    this.colorfilteredlist=[];
    for(let i=0;i<this.tempArray.length;i++){
      this.colorfilteredlist.push(this.tempArray[i]);
    }
  
    }
    else{
      this.tempArray=[];
      for(let i=0;i<this.colorfilteredlist.length;i++)
      {
        if(this.colorfilteredlist[i].color!=e.target.value.toLowerCase())
        {
          this.tempArray[this.l]=this.colorfilteredlist[i];
          this.l++;
        }
      }
    this.colorfilteredlist=[];
    for(let i=0;i<this.tempArray.length;i++){
      if(this.tempArray[i]!=null){
        this.colorfilteredlist.push(this.tempArray[i]);
      } 
    }
    if(this.colorfilteredlist.length==0){
      this.l=0;
      this.j=0;
      this.tempArray=[];
        this.colorfilteredlist=this.productList;
    }
    }
  }

  temp1Array:any=[];
  new1Array:any=[];
  a:number=0;
  b:number=0;
onChangeOfRating(e:any){
  if(e.target.checked){
    for(let i=0;i<this.productList.length;i++)
  {
    if(this.productList[i].rating == e.target.value){
      this.temp1Array[this.a]=this.productList[i];
      this.a++;
    }
  }
  this.colorfilteredlist=[];
  for(let i=0;i<this.temp1Array.length;i++){
    this.colorfilteredlist.push(this.temp1Array[i]);
  }

  }
  else{
    this.temp1Array=[];
      for(let i=0;i<this.colorfilteredlist.length;i++)
      {
        if(this.colorfilteredlist[i].rating!=e.target.value)
        {
          this.temp1Array[this.b]=this.colorfilteredlist[i];
          this.b++;
        }
      }
    this.colorfilteredlist=[];
    for(let i=0;i<this.temp1Array.length;i++){
      if(this.temp1Array[i]!=null){
        this.colorfilteredlist.push(this.temp1Array[i]);
      } 
    }
    if(this.colorfilteredlist.length==0){
      this.b=0;
      this.a=0;
      this.temp1Array=[];
        this.colorfilteredlist=this.productList;
    }
    }
  }
  k:number=0;
  id:number=0;
  filterByRange() {
    var minPrice = this.minarr[this.minarr.length - 1];
    var maxPrice = this.maxarr[this.maxarr.length - 1]
    this.k = 0;
    this.api.getProduct().subscribe((res: any) => {
      this.productList = res;
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].price > minPrice && this.productList[i].price < maxPrice) {
          this.filteredProductList[this.k] = this.productList[i];
          this.k++;

        }
      }
      this.filteredProductList.splice(this.k, this.productList.length - this.k);
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
        this.id=this.usersList[i].id;
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

  search(event: any) {
    this.searchKey = (event.target as HTMLInputElement).value;
  }

  filter(category: string) {
    this.colorfilteredlist = this.productList
      .filter((a: any) => {
        if (a.category == category || category == '') {
          return a;
        }
        
      })
  }

  inc(item: any) {
    this.productsLeft = item.aquant - item.quantity;
    if (item.aquant - item.quantity < 3 && item.aquant - item.quantity != 0) {
      this._snackbar.open("Products left :" + this.productsLeft, "Close", {
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
    if (item.aquant > item.quantity) { item.quantity++;
    item.total=item.quantity*item.price; }
    else {
      this._snackbar.open("Can't add anymore , the product of Out of stock.", "Close", {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
  }
  dec(item: any) {
    if (item.quantity != 1) {
      item.quantity--;
    }
  }

  routeBasedOnId(){
    let strURL="";

  }
  logout(): void {
    this.auth.logout();
  }

}
