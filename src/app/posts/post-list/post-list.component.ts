import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: 'Content 1'},
  //   {title: 'Second Post', content: 'Content 2'},
  //   {title: 'Third Post', content: 'Content 3'}
  // ];
  // Bind from parent
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;

  // Shortcut for creating new postsService property for component
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    // Remove and prevent memory leak
    this.postsSub.unsubscribe();
  }
}
