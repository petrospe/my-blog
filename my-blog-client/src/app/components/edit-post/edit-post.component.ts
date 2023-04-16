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
  post!: Post;
  errorMessage!: string;


  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) { }

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

  onSubmit(): void {
    this.postService.updatePost(this.post).subscribe(
      () => {
        this.router.navigate(['/posts']);
      },
      (error: any) => {
        this.errorMessage = error.message;
      }
    );
  }
}
