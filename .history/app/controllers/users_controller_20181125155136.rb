class UsersController < ApplicationController
  def index
    render json: {
      user: nil
    }
  end
end