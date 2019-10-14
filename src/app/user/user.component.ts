import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersApiService, IUser } from '../users.api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    private userApiService: UsersApiService,
    private router: Router) { }

  title: string
  id: string
  initUserData: {name:string, isAdmin: boolean}
  name: string
  password: string
  isAdmin: boolean
  readOnly: boolean
  deleteMode: boolean
  newMode: boolean
  currentMode: boolean
  canSetAdmin: boolean

  async ngOnInit() {
    this.newMode = !!this.route.snapshot.data.new
    this.readOnly =  !this.route.snapshot.data.edit
    this.deleteMode = !!this.route.snapshot.data.delete
    this.currentMode = !!this.route.snapshot.data.current

    this.title = (this.newMode)?"Create User":(this.deleteMode)?"Delete User":(this.readOnly)?"User Details":"Edit User Details"

    if (this.newMode) {
      this.id = null
      this.name = ""
      this.password = ""
      this.isAdmin = false
      this.canSetAdmin = true
      return
    }

    let id = this.route.snapshot.params['id']
    try {
      let user: IUser
      if ( this.currentMode ) {
        this.id = null
        user = await this.userApiService.getCurrentUser()
        this.canSetAdmin = false
      } else {
        user = await this.userApiService.getUser(id)
        this.id = user._id
        this.canSetAdmin = true
      }
      
      this.initUserData = {name: user.name, isAdmin: user.admin}
      this.name = user.name
      this.password = ""
      this.isAdmin = user.admin
    } catch {
      this.id = this.name = this.password = this.isAdmin = null
      this.readOnly = true
    }
  }

  public onIsAdminSelected() {
    console.log('onIsAdminSelected', this.isAdmin)
  }

  get canSave(): boolean {
    return this.initUserData && (
       this.initUserData.name !== this.name || 
       this.password !== '' || 
       this.isAdmin !== this.initUserData.isAdmin)
  }

  get canAdd(): boolean {
    return this.newMode && 
       this.name !== '' && 
       this.password !== ''
  }

  cancelClicked() {
    if ( this.currentMode ) {
      // TODO
      return
    }
    this.router.navigate(['../../'], {relativeTo: this.route, queryParams: {selected_id:this.id}})
  }

  async saveClicked() {
    let user: {name?: string, password?: string, admin?: boolean} = {
      name: this.name,
      admin: this.isAdmin
    }
    if ( this.password !== '' ) {
      user.password = this.password
    }
    if ( this.currentMode ) {
      await this.userApiService.patchCurrentUser(user)
    } else {
      await this.userApiService.patchUser(this.id, user)
    }
    
    this.cancelClicked()
  }

  async removeClicked() {
    if ( this.currentMode ) {
      await this.userApiService.deleteCurrentUser()
      // TODO: navigate to login users list
    } else {
      await this.userApiService.deleteUser(this.id)
      this.router.navigate(['../../'], {relativeTo: this.route, queryParams: {}})   
    }
  }

  async addClicked() {
    let newUserInfo = await this.userApiService.createUser({name: this.name, password: this.password, admin: this.isAdmin})
    console.log('user was created', newUserInfo)
    // TODO add the token of the new user newUserInfo.token
    this.router.navigate(['../../'], {relativeTo: this.route, queryParams: {selected_id: newUserInfo.user._id}})   
  }
}
