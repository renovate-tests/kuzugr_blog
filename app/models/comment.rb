# frozen_string_literal: true

class Comment < ApplicationRecord
  has_many :articles
end
