import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private _snackbar:MatSnackBar){}
  canActivate(){
    let role=localStorage.getItem('userType');
    if(role=="admin"){
      return true;
    }
    this._snackbar.open("You dont have access to access this page. Contact your adminstrator","Close", {
      duration:2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
  });
    return false;
  }
  
}
