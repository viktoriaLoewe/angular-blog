import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { User } from "./interfaces";

@Component({
  template: ''
})

export class Validation {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
    submitted = false;
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
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
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
    console.log(JSON.stringify(this.form.value, null, 2));

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
