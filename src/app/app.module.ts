import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';

const appRoute: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users/new/edit', component: UserComponent, data: {edit:true, new: true}},
  { path: 'users/current/view', component: UserComponent, data: {edit:false,current:true}},
  { path: 'users/current/edit', component: UserComponent, data: {edit:true,current:true}},
  { path: 'users/current/delete', component: UserComponent, data: {edit:false,current:true,delete:true}},
  { path: 'users/:id/view', component: UserComponent, data: {edit:false}},
  { path: 'users/:id/edit', component: UserComponent, data: {edit:true}},
  { path: 'users/:id/delete', component: UserComponent, data: {edit:false,delete:true}},
  { path: 'users', component: UsersComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    UsersComponent,
    ActionButtonsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
