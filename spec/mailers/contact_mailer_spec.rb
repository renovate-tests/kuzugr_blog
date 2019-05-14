require 'rails_helper'

RSpec.describe ContactMailer, type: :mailer do
  let(:params) { { name: 'テスト太郎', email: 'test@example.com', content: 'メール本文' } }

  describe 'メール送信' do
    it 'メールの内容が正しい' do
      mail = ContactMailer.send_contact(params)
      expect(mail[:subject].value).to eq Settings.mail.contact.title
      expect(mail.body.raw_source).to eq "#{params[:name]}\r\n\r\n#{params[:content]}\r\n\r\n#{params[:email]}"
    end
  end
end
