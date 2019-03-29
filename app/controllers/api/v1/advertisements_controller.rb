# frozen_string_literal: true

module Api
  module V1
    class AdvertisementsController < ApplicationController
      skip_before_action :authenticate_user_from_token!, only: [:index]

      def index
        advertisements = Advertisement.is_display
        render status: 200, json: advertisements
      end
    end
  end
end
