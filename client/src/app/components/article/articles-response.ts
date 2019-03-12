import { Article } from 'src/app/shared/models/article';

export interface ArticlesResponse {
  articles: Array<Article>;
  upload_file_uuids: [];
}
