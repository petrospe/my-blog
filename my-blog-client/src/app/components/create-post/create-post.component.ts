import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  title: string = "";
  content: string = "";

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(postData: {title: string, content: string}): void {
    
    const newPost = {
      title: this.title,
      content: this.content
    } as Post;

    this.postService.createPost(newPost).subscribe(() => {
      console.log('Post created!');
      this.router.navigate(['/']);
    });
  }
  
}
