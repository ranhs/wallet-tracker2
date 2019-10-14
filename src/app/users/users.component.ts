import { Component, OnInit } from '@angular/core';
import { UsersApiService, IUser } from '../users.api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUser[] = []
  selected_id: string
  constructor(private userApiService: UsersApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  setParams(params: {selected_id?: string}) {
    if ( params.selected_id ) {
      this.selected_id = params.selected_id
    } else {
      this.selected_id = null
    }
  }

  async ngOnInit() {
    this.users = await this.userApiService.getUsers()
    this.setParams(this.route.snapshot.queryParams)
    this.route.queryParams.subscribe((params) => {
      this.setParams(params)
    })
  }

  get selected(): boolean {
    return this.selected_id !== null
  }

  selectUser(user: IUser)
  {
    if (user && user._id != this.selected_id) {
      this.router.navigate([], {queryParams: {selected_id: user._id}})
    } else {
      this.router.navigate([], {queryParams: {}})
    }
  }

  addClicked() {
    this.router.navigate(['new', 'edit'], {relativeTo: this.route})
  }

  removeClicked() {
    this.router.navigate([this.selected_id, 'delete'], {relativeTo: this.route})
  }

  editClicked() {
    this.router.navigate([this.selected_id, 'edit'], {relativeTo: this.route})
  }

  viewClicked() {
    this.router.navigate([this.selected_id, 'view'], {relativeTo: this.route})
  }

}
