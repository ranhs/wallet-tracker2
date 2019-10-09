import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {

  constructor() { }

  buttoText = {
    edit: "Edit",
    remove: "Delete",
    save: "Save",
    cancel: "Cancel",
    add: "Add",
    view: "View"
  }

  @Input() showEdit: boolean
  @Input() showRemove: boolean
  @Input() showSave: boolean
  @Input() showCancel: boolean
  @Input() showAdd: boolean
  @Input() showView: boolean

  @Output() editClicked = new EventEmitter();
  @Output() removeClicked = new EventEmitter();
  @Output() saveClicked = new EventEmitter();
  @Output() cancelClicked = new EventEmitter();
  @Output() addClicked = new EventEmitter();
  @Output() viewClicked = new EventEmitter();

  buttonClicked(name: string) {
    this[name+"Clicked"].emit('click')
  }


  ngOnInit() {
  }

}
