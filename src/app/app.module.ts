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

const appRoute: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users/:id', component: UserComponent, data: {edit:false}},
  { path: 'users/:id/edit', component: UserComponent, data: {edit:true}},
  { path: 'users', component: UsersComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    UsersComponent
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
