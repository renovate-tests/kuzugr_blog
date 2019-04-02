FactoryBot.define do
  factory :upload_file do
    file_name { 'ファイル名' }
    file_extension { '.jpg' }
    uuid { 'cvbnjkl;' }
  end
end

