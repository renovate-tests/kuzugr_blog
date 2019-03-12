# frozen_string_literal: true

class Article < ApplicationRecord
  has_many :article_upload_files, dependent: :destroy
  has_many :upload_files, through: :article_upload_files, dependent: :destroy
  belongs_to :user
  accepts_nested_attributes_for :upload_files, allow_destroy: true
end
