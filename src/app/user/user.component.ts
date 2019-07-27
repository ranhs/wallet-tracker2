import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }

  name: string
  password: string
  isAdmin: boolean
  readOnly: boolean
  canSetAdmin: boolean

  ngOnInit() {
    this.name = "Ran"
    this.password = "aaad"
    this.isAdmin = true
    this.readOnly = false
    this.canSetAdmin = true
  }

}
