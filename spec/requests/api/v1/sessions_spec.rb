require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :request do
  let!(:current_user) { create(:user, id: 1) }
  let(:params) do
    {
      user: {
        email: current_user.email,
        password: current_user.password,
      }
    }
  end
  let(:invalid_params) do
    {
      user: {
        email: current_user.email,
        password: 'dummy',
      }
    }
  end

  describe 'POST /api/v1/login' do
    context '正しいアドレスとパスワード' do
      before do
        post '/api/v1/login', params: params
      end
      it 'ログインに成功する' do
        expect(JSON.parse(response.code)).to eq 200
      end
    end

    context '不正なアドレスとパスワード' do
      before do
        post '/api/v1/login', params: invalid_params
      end
      it 'ログインに失敗する' do
        expect(JSON.parse(response.code)).to eq 403
      end
    end
  end

  describe 'GET /api/v1/login_state' do
    context '認証済みの場合' do
      before do
        # ログインしてsessionを作っておく
        post '/api/v1/login', params: params
        get '/api/v1/login_state'
      end
      it 'trueが返る' do
        expect(JSON.parse(response.code)).to eq 200
        expect(JSON.parse(response.body)['login_state']).to eq true
      end
    end

    context '認証していない場合' do
      before do
        get '/api/v1/login_state'
      end
      it 'falseが返る' do
        expect(JSON.parse(response.code)).to eq 200
        expect(JSON.parse(response.body)['login_state']).to eq false
      end
    end
  end
end

