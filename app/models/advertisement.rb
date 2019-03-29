# frozen_string_literal: true

class Advertisement < ApplicationRecord
  scope :is_display, -> { where(display_flag: 1) }
end
