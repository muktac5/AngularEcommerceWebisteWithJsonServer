import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {pipe} from 'rxjs';
import { User } from '../modules/admin/components/userdetails/users';
import { UserdetailsComponent } from '../modules/admin/components/userdetails/userdetails.component';
@Injectable({
  providedIn: 'root'
})
export class RestService {

  
  constructor(private http: HttpClient) { 
  }
  postPolicy(data:any)
  {
    return this.http.post<any>("http://localhost:3000/signup",data);
    pipe(map((res:any)=>{
      return res;
    }) )
  }

  getPolicy()
  {
    return this.http.get<any>("http://localhost:3000/signup");
    pipe(map((res:any)=>{
      return res;
    }) )
  }

  updatePolicy(data:any,id:string)
  {
    return this.http.put<any>("http://localhost:3000/signup"+"/"+id,data);
    pipe(map((res:any)=>{
      return res;
    }) )
  }

  deletePolicy(id: number)
  {
    return this.http.delete<any>("http://localhost:3000/signup"+"/"+id);
    pipe(map((res:any)=>{
      return res;
    }) )
  }


  
}
