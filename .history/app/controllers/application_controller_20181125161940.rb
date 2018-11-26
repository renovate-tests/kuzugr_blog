class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  before_action :configure_permitted_parameters, if: :devise_controller?
  after_action :return_sign_in_result, if: :sign_in_action?

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
  end

  def return_sign_in_result
    if current_user
      sign_in_result = { result: true }
      response_code = 302
    else
      sign_in_result = { result: false }
      response_code = 401
    end
  end

  private
  def sign_in_action?
    params[:controller] == 'devise/sessions' && params[:action] == 'create'
  end
end
