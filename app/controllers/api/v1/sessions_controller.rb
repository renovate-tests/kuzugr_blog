# frozen_string_literal: true

module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :authenticate_user_from_token!
      protect_from_forgery except: :create

      # POST /v1/login
      def create
        @user = User.find_for_database_authentication(email: user_params[:email])
        return invalid_email unless @user

        if @user.valid_password?(user_params[:password])
          sign_in :user, @user
          cookies[:access_token] = { value: @user.access_token, secure: Rails.env.production? }
          cookies[:email] = { value: @user.email, secure: Rails.env.production? }
          render json: @user, serializer: SessionSerializer, root: nil
        else
          invalid_password
        end
      end

      def login_state
        auth_token = cookies[:access_token]
        login_state = auth_token ? authenticate_with_auth_token(auth_token) : false
        render json: { login_state: login_state }
      end

      private
      def user_params
        params[:user]
      end
      def invalid_email
        warden.custom_failure!
        render status: 403, json: { message: 'invalid_email' }
      end

      def invalid_password
        warden.custom_failure!
        render status: 403, json: { message: 'invalid_password' }
      end
    end
  end
end