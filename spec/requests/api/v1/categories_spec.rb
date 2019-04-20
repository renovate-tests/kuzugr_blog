require 'rails_helper'

RSpec.describe Api::V1::CategoriesController, type: :request do
  let!(:category) { create(:category) }

  describe 'GET /api/v1/categories' do
    before do
      get '/api/v1/categories'
    end
    it 'カテゴリが取得できる' do
      expect(JSON.parse(response.body)[0]['name']).to eq category.name
    end
  end
end
