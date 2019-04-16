require 'rails_helper'

RSpec.describe Api::V1::ArticlesController, type: :request do
  let!(:current_user) { create(:user, id: 1) }
  let!(:article) { create(:article, user_id: current_user.id, title: '記事作成') }
  let!(:not_published_article) { create(:article, user_id: current_user.id, mark_content: '未公開', published: false, created_at: '9999-12-31 23:59:59') }
  let!(:blog_informations) { create(:blog_information) }
  let!(:thumbnail) { create(:thumbnail, article_id: article.id) }
  let!(:category) { create(:category) }
  let!(:comment) { create(:comment, article_id: article.id) }
  # 存在しないidをひとまず適当な値として定義する
  let!(:not_exist_id) { 999999 }

  describe 'GET /api/v1/articles' do
    describe'記事がない場合' do
      before do
        Article.destroy_all
        get '/api/v1/articles'
      end
      it '空が返る' do
        expect(JSON.parse(response.body)).to eq []
      end
    end

    describe'記事がある場合' do
      context 'サムネイル、カテゴリあり' do
        before do
          article.category = category
          article.save!
          get '/api/v1/articles'
        end
        it '正しく記事が取得できる' do
          article_response = JSON.parse(response.body)[0]
          expect(article_response['id']).to eq article.id
          expect(article_response['thumbnail_url']).to eq "https://kuzugr-blog-development.s3.ap-northeast-1.amazonaws.com/images/#{article.thumbnail.uuid}"
          expect(article_response['category']).to eq category.name
          expect(article_response['category_id']).to eq category.id
          expect(article_response['id']).to eq article.id
        end
      end

      context 'サムネイル、コメント、カテゴリなし' do
        before do
          Thumbnail.destroy_all
          Comment.destroy_all
          Category.destroy_all
          get '/api/v1/articles'
        end
        it '正しく記事が取得できる' do
          article_response = JSON.parse(response.body)[0]
          expect(article_response['id']).to eq article.id
          expect(article_response['thumbnail_url']).to eq blog_informations.profile_image
          expect(article_response['category']).to be_nil
          expect(article_response['category_id']).to be_nil
          expect(article_response['comments']).to be_nil
        end
      end

      context 'params[:limit] = 1の場合' do
        before do
          get '/api/v1/articles', params: { limit: 1 }
        end
        it 'コメントも返る' do
          article_response = JSON.parse(response.body)[0]
          expect(article_response['id']).to eq article.id
          expect(article_response['comments'][0]['name']).to eq comment.name
          expect(article_response['comments'][0]['content']).to eq comment.content
        end
      end

      context '認証済みの場合' do
        before do
          allow_any_instance_of(Api::V1::ArticlesController).to receive(:published_option).and_return([true, false])
          get '/api/v1/articles', params: { limit: 1 }
        end
        it '公開されていない記事を含む' do
          article_response = JSON.parse(response.body)[0]
          expect(article_response['id']).to eq not_published_article.id
        end
      end
    end
  end

  describe 'GET /api/v1/articles/:id' do
    context '存在しないid' do
      before do
        get "/api/v1/articles/#{not_exist_id}"
      end
      it '404エラーが返る' do
        expect(response.code).to eq '404'
      end
    end

    context '存在するid' do
      before do
        get "/api/v1/articles/#{article.id}"
      end
      it '正しく取得できる' do
        article_response = JSON.parse(response.body)
        expect(article_response['id']).to eq article.id
      end
    end

    context '未認証で未公開の記事の要求をした場合' do
      before do
        get "/api/v1/articles/#{not_published_article.id}"
      end
      it '404エラーが返る' do
        expect(response.code).to eq '404'
      end
    end

    context '認証済みで未公開の記事の要求をした場合' do
      before do
        allow_any_instance_of(Api::V1::ArticlesController).to receive(:published_option).and_return([true, false])
        get "/api/v1/articles/#{not_published_article.id}"
      end
      it '正しく取得できる' do
        article_response = JSON.parse(response.body)
        expect(article_response['id']).to eq not_published_article.id
      end
    end
  end

  describe 'POST /api/v1/articles' do
    # idの被り等をなくすため既存記事を先に消しておく
    before { Article.destroy_all }
    let(:params) do
      {
        article:
          {
            title: 'created title',
            mark_content: 'created mark_content',
            html_content: 'created html_content',
            category_id: article.category_id,
            published: false,
          }
      }
    end
    let(:invalid_params) do
      {
        article:
          {
            title: 'created title',
            mark_content: nil,
            html_content: nil,
            category_id: article.category_id,
            published: false,
          }
      }
    end
    context '正しいparameterの場合' do
      before do
        allow_any_instance_of(ApplicationController).to receive(:authenticate_user_from_token!).and_return(true)
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(current_user)
        post '/api/v1/articles', params: params
      end
      it '作成に成功する' do
        created_article = Article.last
        expect(response.code).to eq '201'
        expect(created_article.title).to eq params[:article][:title]
        expect(created_article.mark_content).to eq params[:article][:mark_content]
        expect(created_article.html_content).to eq params[:article][:html_content]
        expect(created_article.category_id).to eq params[:article][:category_id]
        expect(created_article.published).to eq params[:article][:published]
      end
    end

    context '不正なparameterの場合' do
      before do
        allow_any_instance_of(ApplicationController).to receive(:authenticate_user_from_token!).and_return(true)
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(current_user)
        post '/api/v1/articles', params: invalid_params
      end
      it 'エラーが返る' do
        expect(response.code).to eq '400'
      end
    end
  end

  describe 'PATCH /api/v1/articles/:id' do
    let(:params) do
      {
        article:
          {
            id: article.id,
            title: 'changed title',
            mark_content: 'changed mark_content',
            html_content: 'changed html_content',
            category_id: article.category_id,
            published: false,
          }
      }
    end
    context '正しいidの場合' do
      before do
        allow_any_instance_of(ApplicationController).to receive(:authenticate_user_from_token!).and_return(true)
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(current_user)
        patch "/api/v1/articles/#{params[:article][:id]}", params: params
      end
      it '更新に成功する' do
        changed_article = Article.find(article.id)
        expect(response.code).to eq '204'
        expect(changed_article.title).to eq params[:article][:title]
        expect(changed_article.mark_content).to eq params[:article][:mark_content]
        expect(changed_article.html_content).to eq params[:article][:html_content]
        expect(changed_article.published).to eq params[:article][:published]
      end
    end

    context '不正なidの場合' do
      before do
        allow_any_instance_of(ApplicationController).to receive(:authenticate_user_from_token!).and_return(true)
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(current_user)
        patch "/api/v1/articles/#{not_exist_id}", params: params
      end
      it '404エラーが返る' do
        expect(response.code).to eq '404'
      end
    end

    context '認証が通っていない場合' do
      before do
        patch "/api/v1/articles/#{not_exist_id}", params: params
      end
      it '401エラーが返る' do
        expect(response.code).to eq '401'
      end
    end
  end

  describe 'DELETE /api/v1/articles/:id' do
    context '正しいidの場合' do
      before do
        allow_any_instance_of(ApplicationController).to receive(:authenticate_user_from_token!).and_return(true)
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(current_user)
        delete "/api/v1/articles/#{article.id}"
      end
      it '削除に成功する' do
        expect(response.code).to eq '204'
        expect(Article.find_by(id: article.id)).to be nil
      end
    end

    context '不正なidの場合' do
      before do
        allow_any_instance_of(ApplicationController).to receive(:authenticate_user_from_token!).and_return(true)
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(current_user)
        delete "/api/v1/articles/#{not_exist_id}"
      end
      it '削除に成功する' do
        expect(response.code).to eq '404'
      end
    end
  end

  describe 'GET /api/v1/articles/search' do
    context 'キーワードでの検索' do
      let(:params) { { keyword: '作成' } }
      before do
        get '/api/v1/articles/search', params: params
      end
      it '検索に成功する' do
        expect(response.code).to eq '200'
        search_response = JSON.parse(response.body)
        expect(search_response[0]['id']).to eq article.id
      end
    end

    context 'カテゴリでの検索' do
      let(:params) { { category_id: category.id } }
      before do
        article.category = category
        article.save!
        get '/api/v1/articles/search', params: params
      end
      it '検索に成功する' do
        expect(response.code).to eq '200'
        search_response = JSON.parse(response.body)
        expect(search_response[0]['id']).to eq article.id
      end
    end

    context '認証済みの場合' do
      let(:params) { { keyword: '未公開' } }
      before do
        allow_any_instance_of(Api::V1::ArticlesController).to receive(:published_option).and_return([true, false])
        get '/api/v1/articles/search', params: params
      end
      it '未公開の記事も取得できる' do
        expect(response.code).to eq '200'
        search_response = JSON.parse(response.body)
        expect(search_response[0]['id']).to eq not_published_article.id
      end
    end

    context 'parameterが不正な場合' do
      let(:params) { { test: '未公開' } }
      before do
        get '/api/v1/articles/search', params: params
      end
      it '400エラーが返る' do
        expect(response.code).to eq '400'
      end
    end

    context '検索結果が0件の場合' do
      let(:params) { { keyword: '検索にかからない' } }
      before do
        get '/api/v1/articles/search', params: params
      end
      it '空が返る' do
        expect(response.code).to eq '200'
        expect(JSON.parse(response.body)).to eq []
      end
    end
  end

  describe 'GET /api/v1/articles/monthly_archive' do
    context '記事がない場合' do
      before do
        Article.destroy_all
        get '/api/v1/articles/monthly_archive'
      end
      it '空のhashが返る' do
        expect(response.code).to eq '200'
        expect(JSON.parse(response.body)).to be {}
      end
    end

    context '記事がある場合' do
      before do
        get '/api/v1/articles/monthly_archive'
      end
      it '月別アーカイブのhashが返る' do
        expect(response.code).to eq '200'
        article_year = article.created_at.strftime('%Y')
        article_month = article.created_at.strftime('%Y/%m')
        expected_response = { 'years' => [article_year], 'archives' => { article_month => 1 } }
        expect(JSON.parse(response.body)).to eq expected_response
      end
    end
  end

  describe 'POST /api/v1/articles/update_publish_status' do
    let(:params) { { id: article.id } }
    let(:invalid_params) { { id: not_exist_id } }
    context '公開を非公開にする' do
      before do
        allow_any_instance_of(ApplicationController).to receive(:authenticate_user_from_token!).and_return(true)
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(current_user)
        post '/api/v1/articles/update_publish_status', params: params
      end
      it '更新に成功する' do
        expect(response.code).to eq '200'
        expect(Article.find(article.id).published).to eq false
      end
    end

    context '非公開を公開にする' do
      before do
        allow_any_instance_of(ApplicationController).to receive(:authenticate_user_from_token!).and_return(true)
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(current_user)
        article.published = false
        article.save!
        post '/api/v1/articles/update_publish_status', params: params
      end
      it '更新に成功する' do
        expect(response.code).to eq '200'
        expect(Article.find(article.id).published).to eq true
      end
    end

    context '不正なparameterの場合' do
      before do
        allow_any_instance_of(ApplicationController).to receive(:authenticate_user_from_token!).and_return(true)
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(current_user)
        post '/api/v1/articles/update_publish_status', params: invalid_params
      end
      it '404エラーが返る' do
        expect(response.code).to eq '404'
      end
    end

    context '認証が通っていない場合' do
      before do
        post '/api/v1/articles/update_publish_status', params: invalid_params
      end
      it '401エラーが返る' do
        expect(response.code).to eq '401'
      end
    end
  end
end
