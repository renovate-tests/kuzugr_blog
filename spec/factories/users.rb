FactoryBot.define do
  factory :user do
    id { 1 }
    email { 'test@mail.com' }
    password { 'testPass' }
    nickname { 'テストユーザ' }
  end
end

