import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  getProduct(){
    return this.httpClient.get<any>(" http://localhost:3000/products") 
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getProductById(id:string){
    return this.httpClient.get<any>("http://localhost:3000/products/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
