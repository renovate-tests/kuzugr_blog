require 'rails_helper'

RSpec.describe Api::V1::UploadFilesController, type: :request do
  let!(:image) { 'spec/images/Desert.jpg' }

  describe 'POST /api/v1/upload_files' do
    context 'parameterが正しい場合' do
      before do
        uplaod_image =  fixture_file_upload(image, "image/jpeg")
        post '/api/v1/upload_files', params: { image: uplaod_image }
      end
      it '200が返る' do
        expect(response.code).to eq '200'
        expect(JSON.parse(response.body)['public_url']).to be_present
        expect(JSON.parse(response.body)['uuid']).to be_present
      end
    end

    context '不正なparameterの場合' do
      before do
        uplaod_image =  fixture_file_upload(image, "image/jpeg")
        post '/api/v1/upload_files'
      end
      it '500エラーが返る' do
        expect(response.code).to eq '500'
      end
    end
  end
end
