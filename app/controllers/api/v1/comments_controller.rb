# frozen_string_literal: true

module Api
  module V1
    class CommentsController < ApplicationController
      skip_before_action :authenticate_user_from_token!, only: [:index]
      skip_before_action :verify_authenticity_token, only: [:create, :destroy]

      def index
        comments = Comment.where(article_id: params[:article_id])
        render status: 200, json: comments
      end

      def create
        comment = Comment.new(comment_params)
        comment.save!
      end

      def destroy
        comment = Comment.find(params[:id])
        comment.destroy
      end

      private
      def comment_params
        params[:comment].permit(:name, :content, :article_id)
      end
    end
  end
end
