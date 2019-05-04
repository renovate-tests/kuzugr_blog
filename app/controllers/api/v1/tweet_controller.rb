# frozen_string_literal: true

module Api
  module V1
    class TweetController < ApplicationController

      def create
        if ENV['RAILS_ENV'] == 'production'
          twitter_service = TwitterService.new(tweet_params[:message])
          twitter_service.call
        else
          raise Exception
        end
        render status: 200
      end

      private
      def tweet_params
        params.require(:tweet).permit(:message)
      end
    end
  end
end
