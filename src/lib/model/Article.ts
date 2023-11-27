export class Article {
  title: string;
  content: string;
  date?: string;
  tags: string[];
  constructor({ title, content, date, tags }: Article) {
    this.title = title;
    this.content = content;
    this.date = date;
    this.tags = tags;
  }
}
