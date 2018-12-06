class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :user_id, :thumbnail, :created_at, :updated_at
end