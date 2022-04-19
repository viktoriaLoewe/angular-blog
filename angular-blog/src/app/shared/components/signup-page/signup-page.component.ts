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
  form: FormGroup = new FormGroup({});
  submitted = false;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
    ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6)
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
    console.log('submit');
    if (this.form.invalid) {
      return;
    }
    this.form.value;
    // console.log(JSON.stringify(this.form.value, null, 2));

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
// onReset(): void {
  //   this.submitted = false;
  //   this.form.reset();
  // }

}
