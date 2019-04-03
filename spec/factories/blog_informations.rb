FactoryBot.define do
  factory :blog_information do
    title { 'Title' }
    profile_image { 'https://test' }
    profile_name { 'Name' }
    profile_text { 'Text' }
  end
end
