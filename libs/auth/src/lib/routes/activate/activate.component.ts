import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../models/User';

@Component({
  selector: 'ab-auth-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css'],
})
export class ActivateComponent implements OnInit {
  form!: FormGroup;
  userToken!: Partial<User>;
  constructor(
    private fb: FormBuilder,
    private users: UsersService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userToken = this.route.snapshot.params;
    this.form = this.fb.group({
      email: new FormControl(this.userToken.email, [Validators.required]),
      atk: new FormControl(this.userToken.atk, [Validators.required]),
    });
  }

  activate() {
    const user = this.form.value as User;
    console.log(user);
    this.users.getByEmailCredential$(user).subscribe({
      next: (authorizedUser) => this.auth.authenticateUser(authorizedUser),
      error: () => this.auth.unauthenticateUser(user),
    });
  }
}
