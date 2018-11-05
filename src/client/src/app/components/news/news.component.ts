import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service'
import { News } from '../../News';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatTableDataSource, MatSort, Sort } from '@angular/material';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [NewsService]
})
export class NewsComponent implements OnInit {
  news : News[];
  title = 'HN Feed';
  dataSource; 
  displayedColumns: string[] = ['story_title', 'author', 'created_at', '_id'];
  today = new Date();

  @ViewChild(MatSort) sort: MatSort;
  sortBy: Date;
  
  constructor(private newsService: NewsService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/baseline-delete-24px.svg'));
  }

  getNews() {
    this.newsService.getNews().subscribe(data => {
      this.news = data as News[];
      this.dataSource = new MatTableDataSource(data as News[]);
      this.news.sort(function (a, b) {
        let c = Math.round((new Date(a.created_at)).getTime() / 1000);
        let d = Math.round((new Date(b.created_at)).getTime() / 1000);
        return (d - c);
      });
    });
  }
  
  ngOnInit() {
    this.getNews();
  }

  ngAfterViewInit() {
  }

  selectRow(data) {
    if (data.story_url != null || data.url != null){
      (data.story_url) ? window.open(data.story_url):window.open(data.url);
    }
  }

  delete(news: News){
    const newNot = news
    newNot.deleted =  true;
    this.newsService.removeNews(newNot).subscribe(data => {
      this.getNews();
    });
  }

}
