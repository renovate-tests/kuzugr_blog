require 'rails_helper'

RSpec.describe Api::V1::CategoriesController, type: :request do
  let!(:category2) { create(:category, display_order: 2, name: 'カテゴリー2') }
  let!(:category1) { create(:category, display_order: 1, name: 'カテゴリー1') }

  describe 'GET /api/v1/categories' do
    before do
      get '/api/v1/categories'
    end
    it 'カテゴリが取得できる' do
      expect(JSON.parse(response.body)[0]['name']).to eq category1.name
    end
  end
end
