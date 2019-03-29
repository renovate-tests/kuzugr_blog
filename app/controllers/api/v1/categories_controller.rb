# frozen_string_literal: true

module Api
  module V1
    class CategoriesController < ApplicationController
      skip_before_action :authenticate_user_from_token!, only: [:index, :with_number]

      def index
        categories = Category.all
        render status: 200, json: categories,
               each_serializer: CategorySerializer
      end

      def with_number
        @categories = Category.all
        render status: 200, json: @categories,
               each_serializer: CategorySerializer, include_number: true
      end
    end
  end
end
