# frozen_string_literal: true

module Api
  module V1
    class ThumbnailsController < ApplicationController
      def create
        image = params[:image]
        s3 = Aws::S3::Resource.new(region:'ap-northeast-1')
        obj = s3.bucket(UploadFile.s3_bucket_name).object('thumbnails/#{uuid}')
        obj.upload_file(image.tempfile)
        render json: { public_url: obj.public_url}
      end
    end
  end
end
