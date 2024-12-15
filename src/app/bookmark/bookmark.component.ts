import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../services/bookmark.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  
  templateUrl: './bookmark.component.html',
  imports:[CommonModule],
  styleUrl: './bookmark.component.css'
})
export class BookmarkComponent implements OnInit {
  
  bookmarks: any[] = [];
  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.getBookmarks();
  }
  // Remove card from bookmarks
  removeBookmark(card: { RemedyId:number,RemedyName:string,Remediesimg:string,Description:string,Benefits:string,PreperationMethod:string,UsageInstructions:string,CategoryId:number,createdBy:string,category:string }): void {
    this.bookmarkService.removeBookmark(card);
    this.bookmarks = this.bookmarkService.getBookmarks();  // Re-fetch the bookmarks after removal
  }
}

