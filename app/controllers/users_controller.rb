class UsersController < ApplicationController
  def index
    binding.pry
    render json: {
      user: current_user
    }
  end
end