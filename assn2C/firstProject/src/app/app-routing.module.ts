import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { SignupComponent } from './comp/signup/signup.component';
import { LoginComponent } from './comp/login/login.component';
import { HomeComponent } from './comp/home/home.component';

const routes: Routes = [
  {
    component:SignupComponent,
    path:'signup'
  },
  
  {
    component:LoginComponent,
    path:'login'
  },
  {
    component:HomeComponent,
    path:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
