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

  public createUser(user: {name: string, password: string, admin:boolean}): Promise<{user: IUser, token: string}> {
    return new Promise<{user: IUser, token: string}>((resolve, reject) => {
      this.http.post(`/api/users`, user, this.httpOptions).subscribe( (data) => {
        resolve(<{user: IUser, token: string}>data)
      }, (error) => {
        reject(error)
      })
    })
  }

  public patchUser(id: string, user: {name?: string, password?: string, admin?:boolean}): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      this.http.patch(`/api/users/${id}`, user, this.httpOptions).subscribe( (data) => {
        resolve(<IUser>data)
      }, (error) => {
        reject(error)
      })
    })
  }

  public deleteUser(id: string): Promise<void> {
    return new Promise<void>((resolve, reject)=>{
      this.http.delete(`/api/users/${id}`, this.httpOptions).subscribe( () => {
        resolve()
      }, (error) => {
        reject(error)
      })
    })
  }

  public onIsAdminSelected() {
    console.log('onIsAdminSelected')
  }

}
