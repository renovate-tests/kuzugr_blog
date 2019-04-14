# frozen_string_literal: true

class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :html_content, :mark_content, :user_id, :created_at, :updated_at,
             :published, :category, :category_id
  attribute :thumbnail_url, if: :include_thumbnail?
  attribute :comments, if: :include_comments?

  def thumbnail_url
    return BlogInformation.first.profile_image unless object.thumbnail
    bucket_name = UploadFile.s3_bucket_name
    uuid = object.thumbnail.uuid
    "https://#{bucket_name}.s3.ap-northeast-1.amazonaws.com/images/#{uuid}"
  end

  def category
    article_category = object.category
    article_category&.name
  end

  def include_comments?
    instance_options[:include_comments] == true
  end

  def include_thumbnail?
    instance_options[:include_thumbnail] == true
  end
end
