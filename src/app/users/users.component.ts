import { Component, OnInit } from '@angular/core';
import { UsersApiService, IUser } from '../users.api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUser[] = []
  selected_id: string = null
  constructor(private userApiService: UsersApiService) { }

  async ngOnInit() {
    this.users = await this.userApiService.getUsers()
  }

  get selected(): boolean {
    return this.selected_id !== null
  }

  selectUser(user: IUser)
  {
    if (user && user._id != this.selected_id) {
      this.selected_id = user._id
    } else {
      this.selected_id = null
    }
  }

  addClicked() {
    console.log('addClicked')
  }

  removeClicked() {
    console.log('removedClicked')
  }

  editClicked() {
    console.log('editClicked')
  }

  viewClicked() {
    console.log('viewClicked')
  }

}
