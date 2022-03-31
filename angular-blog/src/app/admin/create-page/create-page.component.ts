import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces';
import Validation from 'src/app/shared/utils/validation';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})


export class CreatePageComponent implements OnInit {
form: FormGroup = new FormGroup({});
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
        description: new FormControl(null, Validators.required),
        content: new FormControl(null, Validators.required)

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
    this.form.value;

    const post: Post = {
      title: this.form.value.title,
      description: this.form.value.description,
      content: this.form.value.content,
    }

    this.postService.create(post).subscribe(() => {
      this.form.reset()
    })

    console.log(post)
  }

}
