class ArticlesController < ApplicationController
  before_action :move_to_index, except: :index
  def index
    @article = Article.all.order('id desc')
  end

  def new
  end

  def edit
    @article = Article.find(params[:id])
  end

  def update
    article = Article.find(params[:id])
    article.update(blog_params) if article.user_id == current_user.id
  end

  def create
    binding.pry
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
    params.permit(:title, :content, :thumbnail)
  end

  def move_to_index
    redirect_to action: :index unless user_signed_in?
  end
end
