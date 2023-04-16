import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  post: Post;
  errorMessage!: string;


  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) { 
    this.post = {} as Post;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.postService.getPost(id).subscribe(
      (post: Post) => {
        this.post = post;
      },
      (error: any) => {
        this.errorMessage = error.message;
      }
    );
  }

  onSubmit() {
    this.postService.updatePost(this.post).subscribe(
      (updatedPost: Post) => {
        console.log("Post updated successfully:", updatedPost);
        this.router.navigate(['/posts', this.post._id]);
      },
      (error: any) => {
        console.error("Error updating post:", error);
        this.errorMessage = error.message;
      }
    );
  }
  
}
