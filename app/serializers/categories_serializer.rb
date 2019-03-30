# frozen_string_literal: true

class CategoriesSerializer < ActiveModel::Serializer
  attributes :id, :name, :create_user_id, :created_at, :updated_at, :number_of_articles

  def number_of_articles
    Article.where(category_id: object.id).count
  end
end
