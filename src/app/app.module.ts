import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';

const appRoute: Routes = [
  { path: '', component: HomeComponent},
  { path: 'user', component: UserComponent},
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
    AppRoutingModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
