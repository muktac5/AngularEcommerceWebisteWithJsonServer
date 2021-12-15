import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/components/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService) {}
  loggedInEmail=sessionStorage.getItem('loggedUser');
  ngOnInit() {
  }
  logout(): void {
    this.auth.logout();
  }

}