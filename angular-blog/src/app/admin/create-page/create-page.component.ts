import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces';
import Validation from 'src/app/shared/utils/validation';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})


export class CreatePageComponent implements OnInit {
form: FormGroup = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    text: new FormControl(''),

  });
    submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostsService
    ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        title: new FormControl(null, Validators.required),
        author: new FormControl(null, Validators.required),
        text: new FormControl(null, Validators.required)


      },
    );
  }

  get f(): { [key: string]: AbstractControl} {
    return this.form.controls;
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    }
    console.log(JSON.stringify(this.form.value, null, 2));

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date()
    }

    this.postService.create(post).subscribe(() => {
      this.form.reset()
    })

    console.log(post)
  }

}
