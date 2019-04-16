# frozen_string_literal: true

class Article < ApplicationRecord
  has_many :article_upload_files, dependent: :destroy
  has_many :upload_files, through: :article_upload_files, dependent: :destroy
  belongs_to :user
  has_one :thumbnail, dependent: :destroy
  belongs_to :category, optional: true
  has_many :comments, dependent: :destroy

  validates :title, presence: true
  validates :mark_content, presence: true
  validates :html_content, presence: true
  validates :user_id, presence: true

  scope :by_keyword, -> (keyword) do
    where('mark_content LIKE ? OR title LIKE ?', "%#{keyword}%", "%#{keyword}%")
  end
  scope :by_category, -> (category_id) { where(category_id: category_id) }
  scope :with_comments_and_thumbnail, -> (published_option, articl_ids) do
    eager_load(:comments, :thumbnail).where(published: published_option, id: articl_ids)
                                     .order('articles.created_at desc, comments.created_at asc')
  end
  scope :with_thumbnail, -> (published_option) do
    includes(:thumbnail).where(published: published_option).order('articles.created_at desc')
  end

  class << self
    def latest_ids(published_option, limit)
      self.where(published: published_option).order('created_at desc').limit(limit).ids
    end
  end
end
