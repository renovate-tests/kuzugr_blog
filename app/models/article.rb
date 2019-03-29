# frozen_string_literal: true

class Article < ApplicationRecord
  has_many :article_upload_files, dependent: :destroy
  has_many :upload_files, through: :article_upload_files, dependent: :destroy
  belongs_to :user
  has_one :thumbnail, dependent: :destroy
  belongs_to :category, optional: true

  scope :by_keyword, -> (keyword) { where('mark_content LIKE ?', "%#{keyword}%") }
  scope :by_category, -> (category_id) { where(category_id: category_id) }
end
