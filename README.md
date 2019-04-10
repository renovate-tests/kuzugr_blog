# README

## 開発環境

### サーバサイド
* ruby
  * 2.4.1
* Rails
  * 5.1.6

### クライアントサイド
* node
  * 10.9.0
* Angular
  * 7.0.6

## ローカル実行方法
### サーバサイドの準備と実行
* `bundle install --path vendor/bundle`
* `bundle exec rake db:create`
* `bundle exec rake ridgepole:apply`
* `bundle exec rails s`

### クライアントサイドの準備と実行
* `npm install -g yarn && yarn global add @angular/cli`
* `ng set --global packageManager=yarn`
* `cd client && yarn`
* `yarn start

### ブラウザでの確認
* /etc/hostsに127.0.0.1としてlocal.kuzugr.comを登録
* ブラウザでlocal.kuzugr.com:4200にアクセス


# MarkDownについて
- マークダウンエディタとしてはangular-markdown-editorを採用
- しかし書き込み中のPreview表示のためngx-markdownも使用している