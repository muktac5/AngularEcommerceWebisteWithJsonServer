import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ElectronicsComponent } from './components/electronics/electronics.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RoleGuard } from 'src/app/guards/role.guard';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductsComponent } from './components/products/products.component';
const routes: Routes = [
  {
    path: '',component: AdminDashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {path:'userdetails1',component:UserdetailsComponent,canActivate:[RoleGuard]},
      { path: 'about', component: AboutusComponent },
      { path: 'services', component: ElectronicsComponent },
      { path: 'contact', component: ContactusComponent },
      {path:'cart',component:CartComponent},
      {path:'services/:id',component:ProductsComponent},
      {path:'checkout',component:CheckoutComponent},
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}