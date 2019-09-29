import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersApiService, IUser } from '../users.api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userApiService: UsersApiService) { }

  id: string
  name: string
  password: string
  isAdmin: boolean
  readOnly: boolean
  canSetAdmin: boolean

  async ngOnInit() {
    let id = this.route.snapshot.params['id']
    this.readOnly =  !this.route.snapshot.data.edit
    try {
      let user = await this.userApiService.getUser(id)
      console.log(JSON.stringify(user,undefined,2))
      this.id = user._id
      this.name = user.name
      this.password = ""
      this.isAdmin = user.admin
    } catch {
      this.id = this.name = this.password = this.isAdmin = null
      this.readOnly = true
    }
    this.canSetAdmin = true
  }

  public onIsAdminSelected() {
    console.log('onIsAdminSelected', this.isAdmin)
  }

}
