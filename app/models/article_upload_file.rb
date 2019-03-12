# frozen_string_literal: true

class ArticleUploadFile < ApplicationRecord
  belongs_to :article
  belongs_to :upload_file, dependent: :destroy
end
