import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly postsUrl = 'http://localhost:3000/api/posts';

  constructor(private readonly http: HttpClient) { } 

  // getPosts(): Observable<Post[]> {
  //   return this.http.get<Post[]>(this.postsUrl)
  // }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postsUrl}`).pipe(
      map(posts => {
        return posts.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          } else if (a.createdAt < b.createdAt) {
            return 1;
          } else {
            return 0;
          }
        });
      })
    );
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

  deletePost(_id: string): Observable<any> {
    const url = `${this.postsUrl}/${_id}`;
    return this.http.delete(url);
  }  
}
