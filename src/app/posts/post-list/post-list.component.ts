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
  private postsSub: Subscription;

  // Shortcut for creating new postsService property for component
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    // Remove and prevent memory leak
    this.postsSub.unsubscribe();
  }
}