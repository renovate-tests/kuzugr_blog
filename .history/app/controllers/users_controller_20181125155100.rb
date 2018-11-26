class ArticlesController < ApplicationController
  def index
    render json: {
      user: current_user
    }
  end
end