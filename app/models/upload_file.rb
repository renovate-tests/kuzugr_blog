# frozen_string_literal: true

class UploadFile < ApplicationRecord
  has_many :article_upload_files, dependent: :destroy
  has_many :articles, through: :article_upload_files

  class << self
    def remove_upload_file(uuid)
      s3 = Aws::S3::Resource.new(region:'ap-northeast-1')
      obj = s3.bucket(s3_bucket_name).object("images/#{uuid}").delete
    end

    def generate_uuid
      uuid = nil
      loop do
        uuid = SecureRandom.uuid
        break unless where(uuid: uuid).exists?
      end
      uuid
    end

    def s3_bucket_name
      # TODO: envか何かに移行
      ENV['RAILS_ENV'] == 'production' ? 'kuzugr-blog' : 'kuzugr-blog-development'
    end
  end
end
