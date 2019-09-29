import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface IUser {
  _id: string
  name: string
  password: string
  admin: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private httpOptions: {headers: HttpHeaders};

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2JiMzNlZTU1ZjEwMzEyYThlOGI1YjciLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTYzNjMwMjczfQ.yiXzIBBgOZDxt2-W-9htrGZNItr-x0uMfxIKycsqa5M"
      })
    }
  }

  private apiUrl(path : string) : string{
    return 'http://localhost:3000' + path
  }

  public getUsers(): Promise<IUser[]> {
    return new Promise<IUser[]>((resolve, reject) => {
      this.http.get('/api/users', this.httpOptions).subscribe( (data ) => {
        resolve(<IUser[]>data);
      }, (error) => {
        reject(error)
      })
    })
  }

  public getUser(id: string): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      this.http.get(`/api/users/${id}`, this.httpOptions).subscribe( (data ) => {
        resolve(<IUser>data);
      }, (error) => {
        reject(error)
      })
    })
  }

  public onIsAdminSelected() {
    console.log('onIsAdminSelected')
  }

}
