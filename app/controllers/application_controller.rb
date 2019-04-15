# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user_from_token!

  rescue_from Exception, with: :server_error
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
  end

  ##
  # User Authentication
  # Authenticates the user with OAuth2 Resource Owner Password Credentials
  def authenticate_user_from_token!
    auth_token = session[:access_token]

    if auth_token
      authenticate_with_auth_token auth_token
    else
      authenticate_error
    end
  end

  private

  def authenticate_with_auth_token auth_token
    unless auth_token.include?(':')
      authenticate_error
      return
    end

    user_id = auth_token.split(':').first
    user = User.where(id: user_id).first

    if user && Devise.secure_compare(user.access_token, auth_token)
      # User can access
      sign_in user, store: false
    else
      authenticate_error
    end
  end

  ##
  # Authentication Failure
  # Renders a 401 error
  def authenticate_error
    render json: { error: t('devise.failure.unauthenticated') }, status: 401
  end

  def render_not_found(exception = nil)
    render status: 404, json: {
      error_code: 404,
      message: exception.message || 'サーバ内部にエラーが発生しました。',
    }
  end

  def server_error(exception = nil)
    render status: 500, json: {
      error_code: 500,
      message: exception.message || 'サーバ内部にエラーが発生しました。',
    }
  end
end
