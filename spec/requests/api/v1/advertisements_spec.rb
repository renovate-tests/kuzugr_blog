require 'rails_helper'

RSpec.describe Api::V1::AdvertisementsController, type: :request do
  let!(:advertisement) { create(:advertisement) }

  describe 'GET /api/v1/advertisements' do
    context '表示フラグが立っている場合' do
      before do
        get '/api/v1/advertisements'
      end
      it '広告が取得できる' do
        expect(JSON.parse(response.body)[0]['id']).to eq advertisement.id
      end
    end

    context '表示フラグが立っていない場合' do
      before do
        advertisement.update!(display_flag: 0)
        get '/api/v1/advertisements'
      end
      it '広告が取得できる' do
        expect(JSON.parse(response.body)).to eq []
      end
    end
  end
end
