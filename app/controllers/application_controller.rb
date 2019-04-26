# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user_from_token!

  rescue_from Exception, with: :render_server_error
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::NotNullViolation, with: :render_invalid_request
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_request

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
    render status: 401, json: {
      error_code: 401,
      message: t('devise.failure.unauthenticated'),
    }
  end

  def render_not_found(exception = nil)
    notify_error(exception)
    render status: 404, json: {
      error_code: 404,
      message: 'not found.',
    }
  end

  def render_server_error(exception = nil)
    notify_error(exception)
    render status: 500, json: {
      error_code: 500,
      message: 'internal server error.',
    }
  end

  def render_invalid_request(exception = nil)
    notify_error(exception)
    render status: 400, json: {
      error_code: 400,
      message: 'bad request.',
    }
  end

  def notify_error(e)
    return unless e
    logger.error e.message
    logger.error e.backtrace.join("\n")
  end
end
