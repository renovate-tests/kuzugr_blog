require 'rails_helper'

RSpec.describe Api::V1::ArticlesController, type: :controller do

  before do
    current_user = User.new(id: 1, nickname: 'kuzugr', email: 'kuzugr.mail', encrypted_password: 'test', sign_in_count: 0, created_at: '2019-03-26 00:00:00', updated_at: '2019-03-26 00:00:00')
    allow(controller).to receive(:authenticate_user_from_token!).and_return true
  end


  describe "GET #index" do
    context 'No record.' do
      before { get :index }

      it 'return an error response' do
        expect(JSON.parse(response.code)).to eq 200
        expect(JSON.parse(response.body)).to eq []
      end
    end
  end
end

