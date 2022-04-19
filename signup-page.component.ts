import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import Validation from '../../utils/validation';
import {User} from '../../interfaces';
import {Router} from '@angular/router';
import { AuthService } from '../../auth/auth.service';



@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})

export class SignupPageComponent implements OnInit {

  username = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  hide = true;

  // form: FormGroup = new FormGroup({});
  form = this.formBuilder.group(
      {
        username: [''],
        email: [''],
        password: [''],
      }
    );

  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
    ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: [''],
        email: [''],
        password: [''],
      },
    );
  }
  // get f(): { [key: string]: AbstractControl } {
  //   return this.form.controls;
  // }


  onSubmit(): void {
    this.submitted = true;
    console.log('button');
    if (this.form.invalid) {
      return;
    }
    this.form.value;

    const user: User = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password
    }


    this.auth.signup(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
    })
  }


 getErrorMessageName() {
    if (this.username.hasError('required')) {
      return 'You must enter a username';
    }
      return this.username.hasError('minlength') ? 'You must use minimum 3 characters' : '';
}


  getErrorMessageMail() {

    if (this.email.hasError('required')) {
      return 'You must enter a email';
    }
     return this.email.hasError('email') ? 'Not a valid email' : '';

    }


getErrorMessagePswd() {
  if (this.password.hasError('required')) {
      return 'You must enter a password' ;
    }
     return this.password.hasError('minlength') ? 'You must use minimum 6 characters' : '';

  }

}
