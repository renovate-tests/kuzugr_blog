# frozen_string_literal: true

class Category < ApplicationRecord
  has_one :article, dependent: :destroy
end
