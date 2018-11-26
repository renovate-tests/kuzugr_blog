class ArticlesController < ApplicationController
  def current_user
    render json: {
      user: current_user
    }
  end
end