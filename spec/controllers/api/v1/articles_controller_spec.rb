require 'rails_helper'

RSpec.describe Api::V1::ArticlesController, type: :controller do
  let(:current_user) { create(:user, id: 1) }
  let(:date) { '2019-04-01 00:00:00' }

  describe 'GET #index' do
    context 'No record.' do
      before { get :index }

      it 'return an error response' do
        expect(JSON.parse(response.code)).to eq 200
        expect(JSON.parse(response.body)).to eq []
      end
    end
    context 'success' do
      let(:expected_response) do
        {
          'category' => nil,
          'category_id' => nil,
          'comments' => [],
          'created_at' => "2019-04-01T00:00:00.000000+09:00",
          'html_content' => '内容1',
          'id'=>article.id,
          'mark_content' => '内容1',
          'thumbnail_url' => 'https://kuzugr-blog-development.s3.ap-northeast-1.amazonaws.com/images/uuid',
          'title' => 'タイトル1',
          'updated_at' => '2019-04-01T00:00:00.000000+09:00',
          'user_id' => 1,
        }
      end
      let!(:article) { create(:article, user_id: current_user.id, created_at: date, updated_at: date) }
      before do
        article.thumbnail = build(:thumbnail)
        get :index
      end

      it 'return success response' do
        expect(JSON.parse(response.code)).to eq 200
        expect(JSON.parse(response.body)).to eq [expected_response]
      end
    end
  end
end
