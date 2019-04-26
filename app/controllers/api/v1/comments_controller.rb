# frozen_string_literal: true

module Api
  module V1
    class CommentsController < ApplicationController
      skip_before_action :authenticate_user_from_token!, only: [:index, :create]

      def index
        comments = Comment.where(article_id: params[:article_id])
        render status: 200, json: comments
      end

      def create
        comment = Comment.new(comment_params)
        mailer_params = { name: comment_params[:name], content: comment_params[:content]  }
        CommentMailer.send_comment_mail(mailer_params).deliver_later if send_mail?
        comment.save!
      end

      def destroy
        comment = Comment.find(params[:id])
        comment.destroy
      end

      private
      def comment_params
        params.require(:comment).permit(:name, :content, :article_id)
      end

      def send_mail?
        request.host == ENV['CORS_ALLOW_HOST'] && !User.logged_in?(session)
      end
    end
  end
end
