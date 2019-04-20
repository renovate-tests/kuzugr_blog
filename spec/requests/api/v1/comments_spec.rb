require 'rails_helper'

RSpec.describe Api::V1::CommentsController, type: :request do
  let!(:category) { create(:category) }

  describe 'GET /api/v1/comments' do
    before do
      get '/api/v1/comments'
    end
  end
end
