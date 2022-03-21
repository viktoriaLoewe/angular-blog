import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../shared/posts.service';
import Validation from 'src/app/shared/utils/validation';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
     text: new FormControl(''), });
  post!: Post;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      })
      ).subscribe((post: Post)=> {
        this.post = post
        this.form = this.formBuilder.group(
      {
        title: new FormControl(null, Validators.required),
        text: new FormControl(null, Validators.required)
      },
    );
      })


  }

  get f(): { [key: string]: AbstractControl} {
    return this.form.controls;
  }

  submit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }
    this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title
    }).subscribe(() => {
      this.submitted = false
    })
  }
}


