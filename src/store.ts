import { NewsFeed, NewsStore } from "./types";

export default class Store implements NewsStore {
  private feeds: NewsFeed[];
  private _currentPage: number;

  constructor() {
    this.feeds = [];
    this._currentPage = 1;
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(page: number) {
    this._currentPage = page;
  }

  get nextPage(): number {
    return this._currentPage * 10 >= this.feeds.length ? this._currentPage : this._currentPage + 1;
  }

  get prevPage(): number {
    return this._currentPage === 1 ? this._currentPage : this._currentPage - 1;
  }

  get numberOfFeed(): number {
    return this.feeds.length;
  }

  get hasFeed(): boolean {
    return this.feeds.length > 0;
  }

  getAllFeeds(): NewsFeed[] {
    return this.feeds;
  }

  getFeed(position: number): NewsFeed {
    return this.feeds[position];
  }

  setFeeds(feeds: NewsFeed[]): void {
    this.feeds = feeds.map((feed) => ({
      ...feed,
      read: false,
    }));
  }

  makeRead(id: number): void {
    const feed = this.feeds.filter((feed: NewsFeed) => feed.id === id)[0];

    if (feed) {
      feed.read = true;
    }
  }
}
