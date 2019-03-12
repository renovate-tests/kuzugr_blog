# README

## 開発環境

### サーバサイド
* ruby
  * 2.4.1
* Rails
  * 5.1.6

### クライアントサイド
* node
  * 8.9.4
* Angular
  * 7.0.6

## ローカル実行方法
### サーバサイド
* `bundle install --path vendor/bundle`
* `bundle exec rake db:create`
* `bundle exec rake ridgepole:apply`

### クライアントサイド
* `npm install -g yarn && yarn global add @angular/cli`
* `ng set --global packageManager=yarn`
* `cd client && yarn`

# MarkDownについて
- マークダウンエディタとしてはangular-markdown-editorを採用
- しかし書き込み中のPreview表示のためngx-markdownも使用している