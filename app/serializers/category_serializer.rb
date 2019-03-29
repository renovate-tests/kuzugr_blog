# frozen_string_literal: true

class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :create_user_id, :created_at, :updated_at
  attribute :number_of_articles, if: :include_number?

  def number_of_articles
    Article.where(category_id: object.id).count
  end

  def include_number?
    instance_options[:include_number] == true
  end
end
