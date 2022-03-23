import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateResponse, Post} from './interfaces';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  endpoint: string = 'https://ngx-training.com';
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.endpoint}/posts`, post)
      // .pipe(map((response: CreateResponse) => {
      //   return {
      //     ...post,
      //     id: response.name,
      //     date: new Date(post.date)
      //   }
      // }))
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${this.endpoint}/posts`)
    .pipe(map((response: {[key:string]: any}) => {
      Object.keys(response).map(key => ({
        ...response[key],
        id:key,
        date: new Date(response[key].date)
      }))
      return []
    }))
  }

getById(id: string): Observable<Post>{
  return this.http.get<Post>(`${this.endpoint}/posts/${id}`)
  .pipe(map((post: Post) => {
        return {
          ...post, id,
          date: new Date(post.date)
        }
      }))
}

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/posts/${id}`)
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${this.endpoint}/posts/${post.id}`, post)
  }

}
