# frozen_string_literal: true

module Api
  module V1
    class UploadFilesController < ApplicationController
      skip_before_action :authenticate_user_from_token!, only: [:create]
      def create
        image = params[:image]
        uuid = UploadFile.generate_uuid
        obj = upload_s3(image, uuid)
        upload_file = UploadFile.new(file_name: image.original_filename,
                                     uuid: uuid,
                                     file_extension: File.extname(image.original_filename))
        upload_file.save!
        render json: { public_url: obj.public_url, uuid: upload_file.uuid }
      end

      private
      def upload_s3(image, uuid)
        s3 = Aws::S3::Resource.new(region:'ap-northeast-1')
        obj = s3.bucket(UploadFile.s3_bucket_name).object("images/#{uuid}")
        upload_result = obj.upload_file(image.tempfile)
        render json: { status: 500, message: 'upload failed' } && return if !upload_result
        obj
      end
    end
  end
end
