import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import Validation from '../../shared/utils/validation';
import {User} from '../../shared/interfaces';
import { AuthService } from 'src/app/shared/auth/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
      },

    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.form.value;
    // console.log(JSON.stringify(this.form.value, null, 2));

    const user: User = {

      email: this.form.value.email,
      identifier: this.form.value.email,
      password: this.form.value.password
    }


    this.auth.login(user);
  }

  // onReset(): void {
  //   this.submitted = false;
  //   this.form.reset();
  // }

}
