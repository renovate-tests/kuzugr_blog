require 'rails_helper'

RSpec.describe Api::V1::BlogInformationsController, type: :request do
  let!(:blog_information) { create(:blog_information) }

  describe 'GET /api/v1/blog_information' do
    before do
      get '/api/v1/blog_informations'
    end
    it '基本情報が取得できる' do
      expect(JSON.parse(response.body)['title']).to eq blog_information.title
    end
  end
end
