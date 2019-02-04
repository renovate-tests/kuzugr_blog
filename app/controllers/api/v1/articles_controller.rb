module Api
  module V1
    class ArticlesController < ApplicationController
      # TODO: upload_thumbnailでなぜCookieが取れないのか
      skip_before_action :authenticate_user_from_token!, only: [:index, :show]
      skip_before_action :verify_authenticity_token, only: [:create, :update]

      def index
        @articles = Article.order('created_at desc').limit(params[:limit])
        render status: 200, json: @articles, each_serializer: ArticleSerializer
      end

      def show
        @article = Article.find(params[:id])
        render status: 200, json: @article, serializer: ArticleSerializer
      end

      def new
      end

      def edit
        @article = Article.find(params[:id])
      end

      def update
        article = Article.find(params[:id])
        article.update(article_params) if article.user_id == current_user.id
      end

      def create
        article = Article.new(article_params)
        article.user_id = current_user.id
        article.save!
      end

      def destroy
        article = Article.find(params[:id])
        article.destroy if article.user_id === current_user.id
      end

      private
      def article_params
        params[:article].permit(:title, :content, :thumbnail)
      end

      def move_to_index
        redirect_to action: :index unless user_signed_in?
      end
    end
  end
end
