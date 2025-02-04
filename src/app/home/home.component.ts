// import {Component} from "@angular/core";

// @Component({
//   selector: 'home',
//   templateUrl: './home.component.html',
//   styles: [``]
// })
// export class HomeComponent {
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../core/models/user.model';
import * as UserActions from '../store/users/users.actions';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users$: Observable<User[]>;
  editingId: number | null = null;
  editForm: FormGroup;

  // Create form controls with proper typing
  nameControl: FormControl = new FormControl('');
  usernameControl: FormControl = new FormControl('');
  emailControl: FormControl = new FormControl('');

  constructor(
    private store: Store<{ users: { users: User[] } }>,
    private fb: FormBuilder
  ) {
    this.users$ = store.select(state => state.users.users);
    this.editForm = this.fb.group({
      name: this.nameControl,
      username: this.usernameControl,
      email: this.emailControl
    });
  }

  ngOnInit() {
    this.store.dispatch(UserActions.loadUsers());
  }

  startEditing(user: User) {
    this.editingId = user.id;
    this.nameControl.setValue(user.name);
    this.usernameControl.setValue(user.username);
    this.emailControl.setValue(user.email);
  }

  cancelEditing() {
    this.editingId = null;
    this.editForm.reset();
  }

  saveUser() {
    if (this.editingId) {
      this.store.dispatch(UserActions.updateUser({
        id: this.editingId,
        user: this.editForm.value
      }));
      this.editingId = null;
      this.editForm.reset();
    }
  }
}