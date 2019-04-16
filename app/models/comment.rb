# frozen_string_literal: true

class Comment < ApplicationRecord
  has_many :articles

  validates :name, presence: true
  validates :content, presence: true
  validates :article_id, presence: true
end
