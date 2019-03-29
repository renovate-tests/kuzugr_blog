# frozen_string_literal: true

module Api
  module V1
    class BlogInformationsController < ApplicationController
      skip_before_action :authenticate_user_from_token!, only: [:index]

      def index
        blog_information = BlogInformation.first
        render status:200, json: blog_information
      end
    end
  end
end
