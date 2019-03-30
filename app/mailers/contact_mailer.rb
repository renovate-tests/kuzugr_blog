class ContactMailer < ActionMailer::Base
  def send_contact(params)
    @content = "#{params[:content]}\n\n#{params[:email]}"
    mail(
      subject: '【お問い合わせ】kuzugrブログ',
      to: ENV['KUZUGR_EMAIL'],
      from: ENV['KUZUGR_EMAIL']
    ) do |format|
      format.text
    end
  end
end