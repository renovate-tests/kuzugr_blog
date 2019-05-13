require 'rails_helper'

RSpec.describe Api::V1::ContactsController, type: :request do
  let!(:params) do
    {
      contact: {
        name: 'テスト太郎',
        content: 'メール本文',
        email: 'test@example.com',
      }
    }
  end
  let!(:invalid_params) do
    {
      contact: {
        name: '',
        content: 'メール本文',
        email: 'test@example.com',
      }
    }
  end

  describe 'GET /api/v1/contacts/send_contact' do
    context 'パラメータが正しい場合' do
      before do
        post '/api/v1/contacts/send_contact', params: params
      end
      it '200が返る' do
        expect(response.code).to eq '200'
      end
    end

    context 'パラメータに誤りがある場合' do
      before do
        post '/api/v1/contacts/send_contact', params: invalid_params
      end
      it '500エラーが返る' do
        expect(response.code).to eq '500'
      end
    end
  end
end
