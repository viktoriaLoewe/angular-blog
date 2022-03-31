import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from './interfaces';


@Injectable({providedIn: 'root'})
export class PostsService {
  endpoint: string = 'https://ngx-training.com';
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.endpoint}/posts`, post)
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.endpoint}/posts`)

  }

getById(id: string): Observable<Post>{
  return this.http.get<Post>(`${this.endpoint}/posts/${id}`)
}

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/posts/${id}`)
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${this.endpoint}/posts/${post.id}`, post)
  }

}
