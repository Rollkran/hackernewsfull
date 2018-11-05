import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from '../News';

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  news: News[];
  domain: string = "http://localhost:3000"
  constructor(private http: HttpClient) { 
    this.news = this.news;
  }

  getNews() {
    return this.http.get(`${this.domain}/api/news`);
  }

  removeNews(newNews: News) {
    return this.http.put(`${this.domain}/api/news/${newNews._id}`, newNews);
  }
}
