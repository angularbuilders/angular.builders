import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../models/User';

@Component({
  selector: 'ab-auth-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css'],
})
export class ActivateComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private users: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const email = this.route.snapshot.params['email'];
    const code = this.route.snapshot.params['code'];
    this.form = this.fb.group({
      email: new FormControl(email, [Validators.required]),
      atk: new FormControl(code, [Validators.required]),
    });
  }

  activate() {
    const user = this.form.value as User;
    console.log(user);
    // ToDo: get User by email, check atk and redirecto to home
    // this.users.logIn(user).subscribe({
    //   next: () => this.router.navigateByUrl('/auth/activate/' + user.atk),
    // });
  }
}
