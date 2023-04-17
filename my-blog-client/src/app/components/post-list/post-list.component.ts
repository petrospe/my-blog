import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];
  errorMessage!: string;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
      // console.log(this.posts);
    });
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe(
        () => {
          console.log('Post deleted successfully');
          this.loadPosts();
        },
        (error: any) => {
          console.error('Error deleting post:', error);
          this.errorMessage = error.message;
        }
      );
    }
  }
  
  loadPosts(): void {
    this.postService.getPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      },
      (error: any) => {
        console.error("Error fetching posts:", error);
        this.errorMessage = error.message;
      }
    );
  }
  

}
