require 'rails_helper'

RSpec.describe CommentMailer, type: :mailer do
  let(:params) { { name: 'Name', content: 'メール本文' } }

  describe 'メール送信' do
    delivery = double
    expect(delivery).to receive(:deliver_now).with(no_args)
    it 'メールの内容が正しい' do
      mail = CommentMailer.send_comment_mail(params)
      expect(mail[:subject].value).to eq Settings.mail.comment.title
      expect(mail.body.raw_source).to eq "#{params[:content]}\r\n\r\n#{params[:name]}"
    end
  end
end
