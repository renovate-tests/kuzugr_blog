# frozen_string_literal: true

class TwitterService
  def initialize(message)
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key = ENV['TWITTER_CONSUMER_KEY']
      config.consumer_secret = ENV['TWITTER_CONSUMER_SECRET']
      config.access_token = ENV['TWITTER_ACCESS_TOKEN']
      config.access_token_secret = ENV['TWITTER_ACCESS_TOKEN_SECRET']
    end
    @message = message
  end

  def call
    return unless ENV['RAILS_ENV'] == 'production'
    @client.update!(@message)
  end
end
