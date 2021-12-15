import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService,private _snackbar:MatSnackBar) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.isLoggedIn()) {
      this._snackbar.open("You need to Log In to view this page!","Close", {
        duration:2000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
    });
      this.router.navigate(['/login2']);
      return false;
    }
    return this.auth.isLoggedIn();
  }
}