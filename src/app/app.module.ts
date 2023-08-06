import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './component/login/login.component';
import { DashboardUserComponent } from './componentUser/dashboard-user/dashboard-user.component';
import { AuthGuard } from './common/auth-guard';
import { AdminJobComponent } from './componentAdmin/admin-job/admin-job.component';
import { DataTablesModule } from 'angular-datatables';
import { ApplyJobComponent } from './component/apply-job/apply-job.component';


const routes:Routes = [{path:'user',component:UserComponent}
,{path:'login',component:LoginComponent},
{path:'adminjob',component:AdminJobComponent,canActivate:[AuthGuard]}
,{path:'userdashboard',component:DashboardUserComponent,canActivate:[AuthGuard]}
,{path:'applyjob',component:ApplyJobComponent,canActivate:[AuthGuard]}
,{path: '',redirectTo:'login',
pathMatch: 'full'}]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    DashboardUserComponent,
    AdminJobComponent,
    ApplyJobComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
     DataTablesModule

  ],

  exports: [RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
