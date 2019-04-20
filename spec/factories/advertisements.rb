FactoryBot.define do
  factory :advertisement do
    name { 'テスト' }
    pc_link { '<a>PCリンク</a>' }
    sp_link { '<a>SPリンク</a>' }
    display_flag { 1 }
  end
end
