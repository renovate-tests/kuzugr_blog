FactoryBot.define do
  factory :article do
    title { 'タイトル1' }
    mark_content { '内容1' }
    html_content { '内容1' }
    published { 1 }
  end
end

