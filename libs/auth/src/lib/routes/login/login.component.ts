import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../models/User';
@Component({
  selector: 'ab-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private users: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  logIn() {
    const user = this.form.value as User;
    console.log(user);
    this.users.logIn(user).subscribe({
      next: () =>
        this.router.navigateByUrl(`/auth/activate/${user.email}/${user.atk}`),
    });
  }
}
