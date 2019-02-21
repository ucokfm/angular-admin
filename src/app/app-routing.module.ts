import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'profile', component: ProfileComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    ProductsComponent,
    ProfileComponent,
  ],
  imports: [MaterialModule, FlexLayoutModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService],
})
export class AppRoutingModule { }
