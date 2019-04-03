require 'rails_helper'

RSpec.describe Api::V1::ArticlesController, type: :controller do
  let!(:current_user) { create(:user, id: 1) }
  let!(:article) { create(:article, user_id: current_user.id) }
  let!(:blog_informations) { create(:blog_information) }
  let!(:thumbnail) { create(:thumbnail, article_id: article.id) }
  let!(:category) { create(:category) }
  let!(:comment) { create(:comment, article_id: article.id) }

  describe 'GET #index' do
    describe'記事がない場合' do
      context do
        before do
          Article.destroy_all
          get :index
        end
        it '空が返る' do
          expect(JSON.parse(response.body)).to eq []
        end
      end
    end

    describe'記事がある場合' do
      context 'サムネイル、カテゴリあり' do
        before do
          article.category = category
          article.save!
          get :index
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
          get :index
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
          get :index, params: { limit: 1 }
        end
        it 'コメントも返る' do
          article_response = JSON.parse(response.body)[0]
          expect(article_response['id']).to eq article.id
          expect(article_response['comments'][0]['name']).to eq comment.name
          expect(article_response['comments'][0]['content']).to eq comment.content
        end
      end
    end
  end

  describe 'GET #show' do
    context '存在しないid' do
      before do
        get :show, params: { id: 999999 }
      end
      it 'エラーが返る' do
        article_response = JSON.parse(response.body)
        expect(article_response['error_code']).to eq 500
      end
    end

    context '存在するid' do
      before do
        get :show, params: { id: article.id }
      end
      it '正しく取得できる' do
        article_response = JSON.parse(response.body)
        expect(article_response['id']).to eq article.id
      end
    end
  end
end
