import { Comment } from '@models/comment';

export class Article {
  id: number;
  title: string;
  mark_content: string;
  html_content: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  upload_file_uuids: any[];
  thumbnail_url: string;
  category: string;
  category_id: number;
  comments: Array<Comment>;
}
