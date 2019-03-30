# frozen_string_literal: true

module Api
  module V1
    class ContactsController < ApplicationController
      skip_before_action :authenticate_user_from_token!, only: [:send_contact]

      def send_contact
        ContactMailer.send_contact(contact_params).deliver if request.host == ENV['CORS_ALLOW_HOST']
        render status: 200, json: { result: true }
      end

      private
      def contact_params
        raise Exception unless params_exist?
        params[:contact].permit(:name, :content, :email)
      end

      def params_exist?
        params[:contact][:name].present? &&
        params[:contact][:content].present? &&
        params[:contact][:email].present?
      end
    end
  end
end
