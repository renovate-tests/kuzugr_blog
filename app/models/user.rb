# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :articles

  after_create :update_access_token!

  def update_access_token!
    self.access_token = "#{self.id}:#{Devise.friendly_token}"
    save
  end

  class << self
    def logged_in?(cookies)
      auth_token = cookies[:access_token]
      return false unless auth_token
      user_id = auth_token.split(':').first
      user = User.where(id: user_id).first
      return user && Devise.secure_compare(user.access_token, auth_token)
    end
  end
end
