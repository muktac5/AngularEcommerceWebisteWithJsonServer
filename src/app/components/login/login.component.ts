import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder ,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private _snackbar:MatSnackBar,private formBuilder:FormBuilder,private auth: AuthService, private router: Router,private httpClient:HttpClient) {}

  submitted:boolean=false;
  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['homepage']);
    }
  }
  get f(){
    return this.loginForm.controls;
  }
  onSubmit(): void {
    this.submitted=true;
    if(this.loginForm.valid){
    this.httpClient.get<any>(" http://localhost:3000/signup").subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      })
      if(user){
      console.log(this.loginForm.value);
      localStorage.setItem('token',"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjoiSldUIFJ1bGVzISIsImlhdCI6MTQ1OTQ0ODExOSwiZXhwIjoxNDU5NDU0NTE5fQ.-yIVBD5b73C75osbmwwshQNRC7frWUYrqaTjTpza2y4");
      this.loginForm.value.email=="admin@gmail.com"?localStorage.setItem('userType','admin'): localStorage.setItem('userType','user');
      sessionStorage.setItem('loggedUser', this.loginForm.value.email);
      this.loginForm.reset();
      this.router.navigate(['admin']);
        this.router.navigate(['admin']);
      }
      else{
        this._snackbar.open("User credentials are wrong!!!","Close", {
          duration:2000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
      });
        this.router.navigate(['login2']);
      }
    })
  }
    

    var isChecked = true;
    if(!this.loginForm.valid){
      for(var a in this.loginForm.controls){
        this.loginForm.controls[a].markAsDirty();
        this.loginForm.controls[a].updateValueAndValidity();
        isChecked=false;
      }
    }
      
  }
}