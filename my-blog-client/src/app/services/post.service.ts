import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Post {
  _id: string;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly postsUrl = 'http://localhost:3000/api/posts';

  constructor(private readonly http: HttpClient) { } 

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl)
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post);
  }

  getPost(_id: string): Observable<Post> {
    const url = `${this.postsUrl}/${_id}`;
    return this.http.get<Post>(url);
  }  

  updatePost(post: Post): Observable<Post> {
    const url = `${this.postsUrl}/${post._id}`;
    return this.http.put<Post>(url, post);
  }

  deletePost(post: Post): Observable<Post> {
    const url = `${this.postsUrl}/${post._id}`;
    return this.http.delete<Post>(url);
  }
}
