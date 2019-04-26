require 'rails_helper'

RSpec.describe Api::V1::CommentsController, type: :request do
  let!(:current_user) { create(:user, id: 1) }
  let!(:article) { create(:article, user_id: current_user.id, title: '記事作成') }
  let!(:comment) { create(:comment, article_id: article.id) }
  # 存在しないidをひとまず適当な値として定義する
  let!(:not_exist_id) { 999999 }

  describe 'GET /api/v1/comments' do
    context 'コメントがある場合' do
      before do
        get '/api/v1/comments', params: { article_id: article.id }
      end
      it 'コメントを取得できる' do
        expect(response.code).to eq '200'
        expect(JSON.parse(response.body)[0]['id']).to eq comment.id
      end
    end

    context 'コメントがない場合' do
      before do
        Comment.destroy_all
        get '/api/v1/comments', params: { article_id: article.id }
      end
      it '空が返る' do
        expect(response.code).to eq '200'
        expect(JSON.parse(response.body)).to eq []
      end
    end
  end

  describe 'POST /api/v1/comments' do
    let(:params) do
      {
        comment: {
          name: 'Test',
          content: 'test content!',
          article_id: article.id,
        },
      }
    end
    let(:invalid_params) do
      {
        comment: {
          name: nil,
          content: 'test content!',
          article_id: article.id,
        }
      }
    end
    context 'パラメータが正しい場合' do
      before do
        post '/api/v1/comments', params: params
      end
      it 'コメントを作成できる' do
        expect(response.code).to eq '204'
        created_comment = Comment.last
        expect(created_comment.name).to eq params[:comment][:name]
        expect(created_comment.content).to eq params[:comment][:content]
        expect(created_comment.article_id).to eq params[:comment][:article_id]
      end
    end

    context '不正なパラメータの場合' do
      before do
        post '/api/v1/comments', params: invalid_params
      end
      it 'エラーが返る' do
        expect(response.code).to eq '400'
      end
    end
  end

  describe 'DELETE /api/v1/comments' do
    context '認証していない場合' do
      before do
        delete "/api/v1/comments/#{comment.id}"
      end
      it '401が返る' do
        expect(response.code).to eq '401'
      end
    end

    context '認証済みの場合' do
      before do
        allow_any_instance_of(ApplicationController).to receive(:authenticate_user_from_token!).and_return(true)
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(current_user)
        delete "/api/v1/comments/#{comment.id}"
      end
      it 'コメントが削除できる' do
        expect(response.code).to eq '204'
        expect(Comment.exists?(id: comment.id)).to eq false
      end
    end

    context '不正なidの場合' do
      before do
        allow_any_instance_of(ApplicationController).to receive(:authenticate_user_from_token!).and_return(true)
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(current_user)
        delete "/api/v1/comments/#{not_exist_id}"
      end
      it '404が返る' do
        expect(response.code).to eq '404'
      end
    end
  end
end
