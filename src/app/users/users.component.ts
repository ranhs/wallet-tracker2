import { Component, OnInit } from '@angular/core';
import { UsersApiService, IUser } from '../users.api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUser[] = []
  constructor(private userApiService: UsersApiService) { }

  async ngOnInit() {
    this.users = await this.userApiService.getUsers()
  }

  get data(): string {
    return JSON.stringify(this.users)
  }

}
