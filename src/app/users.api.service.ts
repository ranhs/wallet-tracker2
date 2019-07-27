import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface IUser {
  name: string
  password: string
  isAdmin: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private http: HttpClient) { }

  private apiUrl(path : string) : string{
    return 'http://localhost:3000' + path
  }

  public getUsers(): Promise<IUser[]> {
    return new Promise<IUser[]>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2JiMzNlZTU1ZjEwMzEyYThlOGI1YjciLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTYzNjMwMjczfQ.yiXzIBBgOZDxt2-W-9htrGZNItr-x0uMfxIKycsqa5M",
          'Origin': 'http://localhost:3000'
        })
      }
      this.http.get('/api/users', httpOptions).subscribe( (data ) => {
        // var users : IUser[] = [];
        // for ( var trans of data ) {
        //   transactions.push( new WalletTransaction(trans.id, new Date(trans.date.year, trans.date.month-1, trans.date.day), trans.description, trans.value, trans.total));
        // }
        resolve(<IUser[]>data);
      }, (error) => {
        reject(error)
      })
    })
  }
}
