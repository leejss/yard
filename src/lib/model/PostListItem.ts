export class PostListItem {
  id: string;
  date: Date;
  title: string;
  slug?: string;

  constructor(post: { id: string; date?: string; title: string; slug?: string }) {
    this.id = post.id;
    this.date = post.date ? new Date(post.date) : new Date();
    this.title = post.title;
    this.slug = post.slug;
  }
}
